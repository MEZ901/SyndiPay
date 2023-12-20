import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";

const PaymentDocument = ({ payment }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    titles: {
      fontSize: 13,
      fontWeight: "bold",
    },
    values: {
      fontSize: 12,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.titles}>Payment Id: {payment?.id}</Text>
          <Text style={styles.titles}>Amount: {payment?.amount}</Text>
          <Text style={styles.titles}>Date: {payment?.date}</Text>
          <Text style={styles.titles}>
            Payment Duration: {payment?.paymentDuration}
          </Text>
          <Text style={styles.titles}>
            Payment Method: {payment?.paymentMethod}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.titles}>Resident Id: {payment?.resident}</Text>
          <Text style={styles.titles}>Apartment Id: {payment?.apartment}</Text>
        </View>
      </Page>
    </Document>
  );
};

PaymentDocument.propTypes = {
  payment: PropTypes.object.isRequired,
};

export default PaymentDocument;
