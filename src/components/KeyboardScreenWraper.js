import React from 'react';
import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native';

export default function KeyboardScreenWrapper({ children, style }) {
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={[styles.flex, style]}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#fff' },
  contentContainer: {
    padding: 20,
    paddingBottom: 60, // siempre deja espacio para el botón
  },
});