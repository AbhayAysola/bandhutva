import { useEffect, useState } from "react";
import { StyleSheet, Pressable } from 'react-native';
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import BarCodeMask from 'react-native-barcode-mask';

import { Text, View } from '../components/Themed'

export default function ScanQRScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // Only runs on first render
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { granted } = await BarCodeScanner.getPermissionsAsync();
      setHasPermission(granted);
    }
    if (hasPermission === null) getBarCodeScannerPermissions(); // Get the permissions if we've not gotten it yet
  }, [hasPermission]);


  const requestBarCodeScannerPermissions = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(granted);
  }

  useEffect(() => {
    if (hasPermission === false) requestBarCodeScannerPermissions(); // Request permissions only if we don't have them
  }, [hasPermission]);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true);
    console.log(type);
    alert(data);
  }

  return (
    <View style={{ flex: 1 }}>
      {!hasPermission ? (
        <View style={styles.container}>
          <Text>We need camera permissions to scan the QR Code</Text>
          <Pressable
            onPress={requestBarCodeScannerPermissions}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <Text style={{ backgroundColor: "#fff", color: "#f34" }}>Okay</Text>
          </Pressable>
        </View>
      ) : (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFillObject, styles.container]}>
          <BarCodeMask width={300} height={300} showAnimatedLine={false} edgeRadius={10} />
        </BarCodeScanner>

      )}
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
