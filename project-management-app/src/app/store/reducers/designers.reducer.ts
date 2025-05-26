import { createReducer, on } from '@ngrx/store';
import { initialDesignersState } from '../states/designers.state';
import * as DesignersActions from '../actions/designers.actions';

export const designersReducer = createReducer(
    initialDesignersState,
    on(DesignersActions.loadDesigners, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(DesignersActions.loadDesignersSuccess, (state, { designers }) => ({
        ...state,
        designers: designers,
        loading: false,
        error: null,
    })),
    on(DesignersActions.loadDesignersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(DesignersActions.createDesigner, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(DesignersActions.createDesignerSuccess, (state, { designer }) => ({
        ...state,
        designers: [...state.designers, designer],
        loading: false,
        error: null,
    })),
    on(DesignersActions.createDesignerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(DesignersActions.updateDesigner, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(DesignersActions.updateDesignerSuccess, (state, { designer }) => ({
        ...state,
        designers: state.designers.map(d => (d.id === designer.id ? designer : d)),
        loading: false,
        error: null,
    })),
    on(DesignersActions.updateDesignerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(DesignersActions.deleteDesigner, state => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(DesignersActions.deleteDesignerSuccess, (state, { id }) => ({
        ...state,
        designers: state.designers.filter(designer => designer.id !== id),
        loading: false,
        error: null,
    })),
    on(DesignersActions.deleteDesignerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
    })),
    on(DesignersActions.selectDesigner, (state, { designerId }) => ({
        ...state,
        selectedDesigner: designerId ? state.designers.find(d => d.id === designerId) || null : null,
    }))
);