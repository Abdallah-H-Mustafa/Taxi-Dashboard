import { AdminActivity } from '@/types/admin';

export interface AuditLogEntry extends AdminActivity {
  severity: 'info' | 'warning' | 'critical';
  metadata?: Record<string, any>;
}

class AuditLogger {
  private static instance: AuditLogger;
  private logs: AuditLogEntry[] = [];

  private constructor() {}

  static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const logEntry: AuditLogEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    this.logs.push(logEntry);
    
    // In a real application, send to backend/logging service
    console.log('Audit Log:', logEntry);
  }

  getLogs(filters?: {
    adminId?: string;
    severity?: AuditLogEntry['severity'];
    startDate?: Date;
    endDate?: Date;
  }): AuditLogEntry[] {
    let filteredLogs = [...this.logs];

    if (filters) {
      const { adminId, severity, startDate, endDate } = filters;

      if (adminId) {
        filteredLogs = filteredLogs.filter(log => log.adminId === adminId);
      }

      if (severity) {
        filteredLogs = filteredLogs.filter(log => log.severity === severity);
      }

      if (startDate) {
        filteredLogs = filteredLogs.filter(
          log => new Date(log.timestamp) >= startDate
        );
      }

      if (endDate) {
        filteredLogs = filteredLogs.filter(
          log => new Date(log.timestamp) <= endDate
        );
      }
    }

    return filteredLogs.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
}

export const auditLogger = AuditLogger.getInstance();