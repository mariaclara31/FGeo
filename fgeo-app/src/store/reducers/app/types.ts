export const SET_APP_STATE = 'SET_APP_STATE'

export interface AppStateType {
  loading: object | boolean
  auth: any
  routerState: string | null,
  clients: any
}

interface commonActionType {
  type: string
  payload: AppStateType
}

export type AppActionTypes = commonActionType
