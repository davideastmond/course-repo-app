export enum StatusState {
  Idle = "idle",
  Loading = "loading",
  Error = "error",
}
const setIdleStatus = (state: any, message: string = "") => {
  state.status.state = StatusState.Idle;
  state.status.idle = message;
};
const setLoadingStatus = (state: any, message: string = "") => {
  state.status.state = StatusState.Loading;
  state.status.loading = message;
};
const setErrorStatus = (state: any, message: string = "") => {
  state.status.state = StatusState.Error;
  state.status.error = message;
};

const setStatus = {
  idle: setIdleStatus,
  loading: setLoadingStatus,
  error: setErrorStatus,
};

export default setStatus;
