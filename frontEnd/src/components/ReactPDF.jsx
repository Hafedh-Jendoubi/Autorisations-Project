import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '../utils'

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    marginBottom: 20,
  },
  sender: {
    marginBottom: 20,
  },
  receiver: {
    marginBottom: 20,
  },
  body: {
    marginBottom: 20,
  },
  signature: {
    marginTop: 40,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  italic: {
    fontFamily: 'Helvetica-Oblique',
  },
});

// Create Document Component
function MyDocument(props) {
  const { client } = props;
  console.log(client);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.bold}>CNI Mentor</Text>
          <Text>17, 1005 Ave Belhassen Ben Chaabane.</Text>
          <Text>Tunis,</Text>
        </View>

        <View style={styles.sender}>
          <Text>{formatDate(new Date())}</Text>
        </View>

        <View style={styles.receiver}>
          <Text>Mr. Ben Lakdher Taher</Text>
          <Text>Ariana Essoghra,</Text>
          <Text>Esprit University.</Text>
        </View>

        <View style={styles.body}>
          <Text>Dear Mr. Ben Lakhdher,</Text>
          <Text style={{ marginTop: 10 }}>
            I, CNI Mentor, am writing this letter to indicate that I authorize {client.nom + " " + client.prenom} that has the CIN {client.cin} to act on my behalf with
            regard to answering calls of number {client.tel} while I am out of town between the dates of February 1, 2024 and March 31, 2024.
          </Text>
          <Text style={{ marginTop: 10 }}>
            I appreciate both your and Mr. {client.nom}’s assistance in this matter.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text>Sincerely,</Text>
          <Text style={{ marginTop: 20 }}>CNI Mentor</Text>
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;
