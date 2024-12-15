"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Driver, DriverDocument } from "@/types/driver";
import { useDriverStore } from "@/lib/stores/driver-store";
import { toast } from "sonner";
import { FileText, Upload } from "lucide-react";

interface DriverDocumentsProps {
  driver: Driver;
  onUpdate: () => void;
}

export function DriverDocuments({ driver, onUpdate }: DriverDocumentsProps) {
  const [uploading, setUploading] = useState<string | null>(null);

  const handleFileUpload = async (type: string, file: File) => {
    setUploading(type);
    try {
      // Mock file upload - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newDoc: DriverDocument = {
        id: crypto.randomUUID(),
        type: type as DriverDocument['type'],
        number: '',
        expiryDate: new Date().toISOString(),
        issuedDate: new Date().toISOString(),
        status: 'active',
        verificationStatus: 'pending',
        fileUrl: URL.createObjectURL(file),
      };

      const updatedDriver = {
        ...driver,
        documents: [...driver.documents, newDoc],
      };

      useDriverStore.getState().drivers.set(driver.id, updatedDriver);
      onUpdate();
      toast.success(`${type} uploaded successfully`);
    } catch (error) {
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading(null);
    }
  };

  const documentTypes = [
    { type: 'license', label: "Driver's License" },
    { type: 'pocket_number', label: "Driver Pocket Number" },
    { type: 'criminal_record', label: "Criminal Record Check" },
    { type: 'criminal_record_back', label: "Criminal Record Back" },
    { type: 'business_license', label: "Business License" },
    { type: 'sponsorship_letter', label: "Sponsorship Letter" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {documentTypes.map(({ type, label }) => {
          const doc = driver.documents.find(d => d.type === type);
          
          return (
            <div key={type} className="space-y-2">
              <Label>{label}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id={`file-${type}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(type, file);
                  }}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={uploading === type}
                  onClick={() => document.getElementById(`file-${type}`)?.click()}
                >
                  {uploading === type ? (
                    "Uploading..."
                  ) : doc ? (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>View Document</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Select File</span>
                    </div>
                  )}
                </Button>
                {doc && (
                  <Badge variant={doc.status === 'active' ? 'success' : 'destructive'}>
                    {doc.status}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}