export const COLORS = {
    black: "#000",
    white: "#fff",
    disabled: "#999999",
}
  
export const SIZE = {
    mobile: "375",
    laptop: "1080",
    desktop: "1600",
}
  
export const DEVICE = {
    mobile: `(min-width: ${SIZE.mobile}px)`,
    laptop: `(min-width: ${SIZE.laptop}px)`,
    desktop: `(min-width: ${SIZE.desktop}px)`,

    maxmobile: `(max-width: ${SIZE.mobile}px)`,
    maxlaptop: `(max-width: ${SIZE.laptop}px)`,
    maxdesktop: `(max-width: ${SIZE.desktop}px)`,
}