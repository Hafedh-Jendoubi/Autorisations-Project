import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { formatDate } from '../utils'

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    border: '2px solid black'
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
  image: {
    width: '110px',
    height: '80px',
    marginLeft: '400px',
    marginBottom: '60px'
  },
  sign: {
    marginLeft: '400px',
  }
});

//Autorisation 1 Template
export function Autor1(props) {
  const { client } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={"PDF_Pictures/cni.jpg"} style={styles.image}></Image>
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
          <Text>CNI Mentor</Text>
          <Image src={"PDF_Pictures/pngegg.png"} style={styles.sign}></Image>
        </View>
      </Page>
    </Document>
  );
}

//Autorisation 2 Template
export function Autor2(props) {
  const { client } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={"PDF_Pictures/cni.jpg"} style={styles.image}></Image>
        <View style={styles.header}>
          <Text style={styles.bold}>CNI Mentor</Text>
          <Text>17, 1005 Ave Belhassen Ben Chaabane.</Text>
          <Text>Tunis,</Text>
        </View>

        <View style={styles.sender}>
          <Text>{formatDate(new Date())}</Text>
        </View>

        <View style={styles.receiver}>
          <Text>To whom it may concern,</Text>
        </View>

        <View style={styles.body}>
          <Text>Subject: Demande d'autorisation d'absence</Text>
          <Text style={{ marginTop: 10 }}>
            I, CNI Mentor, hereby request an authorization of absence for Mr./Ms. {client.nom + " " + client.prenom}, holding CIN {client.cin}, who is a valuable member of our organization.
          </Text>
          <Text style={{ marginTop: 10 }}>
            The requested absence period is from {client.absenceStartDate} to {client.absenceEndDate}. The purpose of this absence is {client.absenceReason}.
          </Text>
          <Text style={{ marginTop: 10 }}>
            I kindly request you to grant this authorization and make the necessary arrangements to accommodate their absence during this period.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Thank you for your understanding and cooperation.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text>Sincerely,</Text>
          <Text>CNI Mentor</Text>
          <Image src={"PDF_Pictures/pngegg.png"} style={styles.sign}></Image>
        </View>
      </Page>
    </Document>
  );
}

// Autorisation du droit à l'image Template
export function Autor3(props) {
  const { client } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={"PDF_Pictures/cni.jpg"} style={styles.image}></Image>
        <View style={styles.header}>
          <Text style={styles.bold}>CNI Mentor</Text>
          <Text>17, 1005 Ave Belhassen Ben Chaabane.</Text>
          <Text>Tunis,</Text>
        </View>

        <View style={styles.sender}>
          <Text>{formatDate(new Date())}</Text>
        </View>

        <View style={styles.receiver}>
          <Text>To whom it may concern,</Text>
        </View>

        <View style={styles.body}>
          <Text>Subject: Autorisation du droit à l'image</Text>
          <Text style={{ marginTop: 10 }}>
            I, CNI Mentor, hereby grant permission to use the image(s) of Mr./Ms. {client.nom + " " + client.prenom}, holding CIN {client.cin}, for the purpose of {client.purpose}.
          </Text>
          <Text style={{ marginTop: 10 }}>
            This authorization is granted without any monetary compensation and is valid for the period from {client.startDate} to {client.endDate}.
          </Text>
          <Text style={{ marginTop: 10 }}>
            I understand that the images may be used in various formats including print, online, and in video, and I waive any right to inspect or approve the finished product.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Thank you for your cooperation.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text>Sincerely,</Text>
          <Text>CNI Mentor</Text>
          <Image src={"PDF_Pictures/pngegg.png"} style={styles.sign}></Image>
        </View>
      </Page>
    </Document>
  );
}