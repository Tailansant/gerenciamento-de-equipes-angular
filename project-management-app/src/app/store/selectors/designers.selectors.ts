import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state.models';
import { DesignersState } from '../states/designers.state';

export const selectDesignersState = createFeatureSelector<AppState, DesignersState>('designers');

export const selectAllDesigners = createSelector(
    selectDesignersState,
    (state: DesignersState) => state.designers
);

export const selectDesignersLoading = createSelector(
    selectDesignersState,
    (state: DesignersState) => state.loading
);

export const selectDesignersError = createSelector(
    selectDesignersState,
    (state: DesignersState) => state.error
);

export const selectSelectedDesigner = createSelector(
    selectDesignersState,
    (state: DesignersState) => state.selectedDesigner
);