"use client";

import L from 'leaflet';
import 'leaflet-draw';
import * as turf from '@turf/turf';

export interface ZoneDrawingOptions {
  color: string;
  fillOpacity?: number;
  weight?: number;
}

export class ZoneDrawingManager {
  private map: L.Map | null = null;
  private drawControl: L.Control.Draw | null = null;
  private drawnItems: L.FeatureGroup;
  private options: ZoneDrawingOptions;
  private drawingHandler: L.DrawEvents.Created | null = null;

  constructor(options: ZoneDrawingOptions) {
    this.drawnItems = new L.FeatureGroup();
    this.options = {
      fillOpacity: 0.2,
      weight: 2,
      ...options
    };
  }

  initialize(map: L.Map) {
    this.map = map;
    this.drawnItems.addTo(map);

    // Initialize draw control
    this.drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e1e4e8',
            message: 'Shape intersections not allowed'
          },
          shapeOptions: {
            color: this.options.color,
            fillOpacity: this.options.fillOpacity,
            weight: this.options.weight
          },
          showArea: true,
          metric: true,
          repeatMode: false
        },
        // Disable other drawing tools
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false
      },
      edit: {
        featureGroup: this.drawnItems,
        remove: true
      }
    });

    map.addControl(this.drawControl);

    // Setup event listeners
    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.map) return;

    // Clear existing drawings when starting a new one
    this.map.on(L.Draw.Event.DRAWSTART, () => {
      this.clearDrawings();
    });

    // Handle created shapes
    this.drawingHandler = this.map.on(L.Draw.Event.CREATED, (e: L.DrawEvents.Created) => {
      const layer = e.layer;
      if (layer instanceof L.Polygon) {
        this.drawnItems.addLayer(layer);
      }
    });

    // Handle edited shapes
    this.map.on(L.Draw.Event.EDITED, (e: L.DrawEvents.Edited) => {
      const layers = e.layers;
      layers.eachLayer((layer) => {
        if (layer instanceof L.Polygon) {
          // Validate edited shape
          const coords = this.getLayerCoordinates(layer);
          if (!this.validateZone(coords)) {
            this.drawnItems.removeLayer(layer);
          }
        }
      });
    });
  }

  enableDrawing() {
    if (!this.map || !this.drawControl) return;
    
    // Get the polygon handler from draw control
    const polygonDrawHandler = new L.Draw.Polygon(this.map, (this.drawControl.options.draw as any).polygon);
    polygonDrawHandler.enable();
  }

  disableDrawing() {
    if (!this.map) return;
    
    // Disable all draw handlers
    Object.values(this.map['_handlers']).forEach((handler: any) => {
      if (handler && typeof handler.disable === 'function') {
        handler.disable();
      }
    });
  }

  clearDrawings() {
    this.drawnItems.clearLayers();
  }

  private getLayerCoordinates(layer: L.Polygon): [number, number][] {
    const latLngs = layer.getLatLngs()[0] as L.LatLng[];
    return latLngs.map(ll => [ll.lat, ll.lng]);
  }

  getDrawnCoordinates(): [number, number][] {
    const coordinates: [number, number][] = [];
    this.drawnItems.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        coordinates.push(...this.getLayerCoordinates(layer));
      }
    });
    return coordinates;
  }

  validateZone(coordinates: [number, number][]): boolean {
    if (coordinates.length < 3) return false;

    try {
      // Ensure the polygon is closed
      if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
          coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
        coordinates.push(coordinates[0]);
      }

      // Create a Turf polygon for validation
      const polygon = turf.polygon([coordinates.map(coord => [coord[1], coord[0]])]);
      
      // Check if polygon is valid
      const isValid = turf.booleanValid(polygon);
      if (!isValid) return false;

      // Calculate area (in square meters)
      const area = turf.area(polygon);
      const MIN_AREA = 100; // Minimum area in square meters
      
      return area >= MIN_AREA;
    } catch (error) {
      console.error('Zone validation error:', error);
      return false;
    }
  }

  addZone(coordinates: [number, number][]) {
    if (!this.validateZone(coordinates)) {
      throw new Error('Invalid zone coordinates');
    }

    const polygon = L.polygon(coordinates, {
      color: this.options.color,
      fillOpacity: this.options.fillOpacity,
      weight: this.options.weight
    });

    this.drawnItems.addLayer(polygon);
    
    if (this.map) {
      this.map.fitBounds(polygon.getBounds());
    }
  }

  destroy() {
    if (!this.map) return;

    // Remove event listeners
    if (this.drawingHandler) {
      this.map.off(L.Draw.Event.CREATED, this.drawingHandler);
    }
    
    // Remove draw control
    if (this.drawControl) {
      this.map.removeControl(this.drawControl);
    }

    // Clear drawings
    this.clearDrawings();
    
    // Remove feature group
    this.drawnItems.remove();
    
    // Reset state
    this.map = null;
    this.drawControl = null;
    this.drawingHandler = null;
  }
}