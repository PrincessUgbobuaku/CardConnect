package com.cardconnect.backend.factory;

import com.cardconnect.backend.domain.CardReport;

public class CardReportFactory {
    public static CardReport create(String studentId, String status, String notes) {
        CardReport report = new CardReport();
        report.setStudentId(studentId);
        report.setStatus(status);
        report.setNotes(notes);
        return report;
    }
}
