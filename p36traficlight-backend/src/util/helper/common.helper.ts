export const commonHelper = {
  convertDecToHex(decimals: any[]) {
    let hexan = '';
    const { length } = decimals;
    // convert id device, cmd, length
    for (let i = 0; i < 3; i += 1) {
      hexan += (decimals[i] % 256).toString(16).toUpperCase().padStart(2, '0');
      hexan += Math.round(decimals[i] / 256).toString(16).toUpperCase().padStart(2, '0');
    }
    // convert data
    for (let i = 3; i < length; i += 1) {
      hexan += decimals[i].toString(16).toUpperCase().padStart(2, '0');
    }
    return hexan;
  },
  convertHexToDec(hex: string) {
    const data = hex.trim();
    const decimals = [];
    // convert id device, cmd, length
    for (let i = 6; i < 18; i += 4) {
      const byteL = parseInt(data[i] + data[i + 1], 16);
      const byteH = parseInt(data[i + 2] + data[i + 3], 16);
      decimals.push(byteL + byteH * 256);
    }
    // convert data
    for (let i = 18; i < data.length - 1; i += 2) {
      decimals.push(parseInt(data[i] + data[i + 1], 16));
    }

    return decimals;
  },

  /**
   * isValidChecksum
   * @param decimals
   */
  isValidChecksum(decimals: number[]) {
    const sum = decimals.reduce((t: number, n: number) => t + n, 0);
    const checksum = (sum - decimals[decimals.length - 1]) % 256;
    return checksum === decimals[decimals.length - 1];
  }
};
