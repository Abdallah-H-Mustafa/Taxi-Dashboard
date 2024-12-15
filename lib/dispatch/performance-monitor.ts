"use client";

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private readonly maxDataPoints = 100;

  private constructor() {
    this.initializeMetrics();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeMetrics() {
    this.metrics.set('responseTime', []);
    this.metrics.set('activeTrips', []);
    this.metrics.set('waitTime', []);
    this.metrics.set('satisfaction', []);
  }

  addMetric(name: string, value: number) {
    const values = this.metrics.get(name) || [];
    values.push(value);
    
    if (values.length > this.maxDataPoints) {
      values.shift();
    }
    
    this.metrics.set(name, values);
  }

  getMetrics(name: string): number[] {
    return this.metrics.get(name) || [];
  }

  getAverageMetric(name: string): number {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) return 0;
    
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }

  clearMetrics() {
    this.metrics.clear();
    this.initializeMetrics();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();