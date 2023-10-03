import { Hide, Show } from "../constant/modal.const";

export const onShow = (payload) => {
  return { type: Show, payload };
};
export const onHide = (payload) => {
  return { type: Hide, payload };
};