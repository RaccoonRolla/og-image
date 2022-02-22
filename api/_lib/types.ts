export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    description: string[];
    md: boolean;
    fontSize: string;
    images: string[];
    widths: string[];
    heights: string[];
}
