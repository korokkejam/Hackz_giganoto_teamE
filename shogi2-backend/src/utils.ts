import os from "os";

export function getLocalIpAddress(localhost:boolean): string | null {
  if (localhost){
    return "localhost";
  }else{
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
      const networkInterface = interfaces[interfaceName];
      if (!networkInterface) continue;

      for (const iface of networkInterface) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    return null;
  }
}
