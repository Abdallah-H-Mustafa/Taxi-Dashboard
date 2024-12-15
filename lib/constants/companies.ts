export const STATIC_COMPANY_IDS = [
  'caribou-cabs',
  'nunavut-caribou-tuktu-cabs',
  'adam-express',
  'nunavut-taxi'
] as const;

export type StaticCompanyId = typeof STATIC_COMPANY_IDS[number];

export function normalizeCompanyId(id: string): string {
  return id
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function isValidCompanyId(id: string): boolean {
  const normalizedId = normalizeCompanyId(id);
  return STATIC_COMPANY_IDS.includes(normalizedId as StaticCompanyId);
}

export function getValidCompanyId(id: string): StaticCompanyId | null {
  const normalizedId = normalizeCompanyId(id);
  return isValidCompanyId(normalizedId) ? normalizedId as StaticCompanyId : null;
}