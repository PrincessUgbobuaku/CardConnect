import { View, StyleSheet, Linking } from "react-native";
import { TextInput as PaperInput } from "react-native-paper";
import { Checkbox as PaperCheckBox } from "react-native-paper";
import { Text as PaperText } from "react-native-paper";

// defining functional component
const ConsentCheckboxes = ({
  consentChecked,
  setConsentChecked,
  privacyChecked,
  setPrivacyChecked,
}) => {
  return (
    <View>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <PaperCheckBox
            status={consentChecked ? "checked" : "unchecked"}
            onPress={() => setConsentChecked(!consentChecked)}
          />
          <PaperText style={styles.checkboxText}>
            I understand that my student number and ID will be used to confirm
            my enrollment at the Cape Peninsula University of Technology
          </PaperText>
        </View>

        <View style={styles.checkboxRow}>
          <PaperCheckBox
            status={privacyChecked ? "checked" : "unchecked"}
            onPress={() => setPrivacyChecked(!privacyChecked)}
          />
          <PaperText style={styles.checkboxText}>
            By registering, I agree to the university’s{" "}
            <PaperText
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  "https://your-university-privacy-policy-link.com"
                )
              }
            >
              Privacy Policy
            </PaperText>
          </PaperText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxText: {
    flex: 1,
    marginTop: 6,
    marginLeft: 12,
    textAlign: "justify",
  },
  linkText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  checkboxContainer: {
    width: '80%',          // same width as your inputs
    alignSelf: 'center',
    // paddingLeft: 35,
    // paddingRight: 35,
    // gap: 80,
    // marginBottom: 100,
  },
});

export default ConsentCheckboxes;
