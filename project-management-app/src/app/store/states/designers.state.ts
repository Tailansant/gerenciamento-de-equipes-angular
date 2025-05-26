import { Designer } from 'src/app/core/models/designer.model';

export interface DesignersState {
designers: Designer[];
loading: boolean;
error: any;
selectedDesigner: Designer | null;
}

export const initialDesignersState: DesignersState = {
designers: [],
loading: false,
error: null,
selectedDesigner: null,
};