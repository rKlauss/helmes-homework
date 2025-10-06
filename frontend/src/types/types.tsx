export interface Sector {
  id: number;
  name: string;
  parentId?: number | null;
}

export interface UserDataDto {
  id?: number;
  name: string;
  sectorIds: number[];
  agree: boolean;
}
