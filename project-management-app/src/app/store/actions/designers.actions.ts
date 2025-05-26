import { createAction, props } from '@ngrx/store';
import { Designer } from '../../core/models/designer.model';

export const loadDesigners = createAction(
'[Designers API] Load Designers',
  props<{ companyId?: string }>() 
);

export const loadDesignersSuccess = createAction(
'[Designers API] Load Designers Success',
props<{ designers: Designer[] }>()
);

export const loadDesignersFailure = createAction(
'[Designers API] Load Designers Failure',
props<{ error: any }>()
);

export const createDesigner = createAction(
'[Designers Page] Create Designer',
props<{ designer: Designer }>()
);

export const createDesignerSuccess = createAction(
'[Designers API] Create Designer Success',
props<{ designer: Designer }>()
);

export const createDesignerFailure = createAction(
'[Designers API] Create Designer Failure',
props<{ error: any }>()
);

export const updateDesigner = createAction(
'[Designers Page] Update Designer',
props<{ id: string; designer: Designer }>()
);

export const updateDesignerSuccess = createAction(
'[Designers API] Update Designer Success',
props<{ designer: Designer }>()
);

export const updateDesignerFailure = createAction(
'[Designers API] Update Designer Failure',
props<{ error: any }>()
);

export const deleteDesigner = createAction(
'[Designers Page] Delete Designer',
props<{ id: string }>()
);

export const deleteDesignerSuccess = createAction(
'[Designers API] Delete Designer Success',
props<{ id: string }>()
);

export const deleteDesignerFailure = createAction(
'[Designers API] Delete Designer Failure',
props<{ error: any }>()
);

export const selectDesigner = createAction(
'[Designers Page] Select Designer',
props<{ designerId: string | null }>()
);