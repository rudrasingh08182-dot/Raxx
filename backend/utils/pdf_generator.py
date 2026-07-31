from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
import os
from datetime import datetime

# ── COLORS ──
ORANGE = colors.HexColor("#f97316")
DARK = colors.HexColor("#111827")
GRAY = colors.HexColor("#6b7280")
LIGHT_GRAY = colors.HexColor("#f3f4f6")
WHITE = colors.white
GREEN = colors.HexColor("#22c55e")
RED = colors.HexColor("#ef4444")
BLUE = colors.HexColor("#3b82f6")

def generate_monthly_report(student_data: dict, output_path: str) -> str:
    """
    Generate monthly PDF report for a student.
    
    student_data = {
        "name": "Rahul Singh",
        "email": "rahul@gmail.com",
        "class": "Class 10",
        "board": "CBSE",
        "month": "June 2026",
        "doubts_asked": 45,
        "notes_generated": 12,
        "mock_tests": [
            { "subject": "Math", "score": 85, "total": 100, "date": "2026-06-01" },
            { "subject": "Science", "score": 72, "total": 100, "date": "2026-06-05" },
        ],
        "games_played": 23,
        "coins_earned": 450,
        "study_streak": 15,
        "homework_submitted": 8,
        "top_subjects": ["Math", "Science"],
        "weak_subjects": ["History"],
        "ai_recommendation": "Focus more on History and practice previous year questions.",
    }
    """

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
    )

    story = []
    styles = getSampleStyleSheet()

    # ── CUSTOM STYLES ──
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Normal"],
        fontSize=22,
        fontName="Helvetica-Bold",
        textColor=WHITE,
        alignment=TA_CENTER,
        spaceAfter=4,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=11,
        fontName="Helvetica",
        textColor=colors.HexColor("#d1d5db"),
        alignment=TA_CENTER,
        spaceAfter=2,
    )
    section_style = ParagraphStyle(
        "Section",
        parent=styles["Normal"],
        fontSize=13,
        fontName="Helvetica-Bold",
        textColor=ORANGE,
        spaceAfter=8,
        spaceBefore=16,
    )
    normal_style = ParagraphStyle(
        "Normal2",
        parent=styles["Normal"],
        fontSize=10,
        fontName="Helvetica",
        textColor=DARK,
        spaceAfter=4,
    )
    small_style = ParagraphStyle(
        "Small",
        parent=styles["Normal"],
        fontSize=9,
        fontName="Helvetica",
        textColor=GRAY,
        spaceAfter=2,
    )

    # ══════════════════════════════
    # HEADER
    # ══════════════════════════════
    header_data = [[
        Paragraph("RAXX AI", title_style),
    ]]
    header_table = Table(header_data, colWidths=[18*cm])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), DARK),
        ("ROWPADDING", (0, 0), (-1, -1), 16),
        ("ROUNDEDCORNERS", [8]),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 0.3*cm))

    # Subtitle below header
    story.append(Paragraph("India's Universal AI Study Platform", subtitle_style))
    story.append(Paragraph(f"Monthly Progress Report — {student_data.get('month', 'June 2026')}", ParagraphStyle(
        "Sub2", parent=styles["Normal"], fontSize=10, textColor=GRAY, alignment=TA_CENTER
    )))
    story.append(Spacer(1, 0.5*cm))
    story.append(HRFlowable(width="100%", thickness=1, color=LIGHT_GRAY))
    story.append(Spacer(1, 0.3*cm))

    # ══════════════════════════════
    # STUDENT INFO
    # ══════════════════════════════
    story.append(Paragraph("Student Information", section_style))

    info_data = [
        ["Name", student_data.get("name", "—"),       "Class", student_data.get("class", "—")],
        ["Email", student_data.get("email", "—"),      "Board", student_data.get("board", "—")],
        ["Report Month", student_data.get("month", "—"), "Generated", datetime.now().strftime("%d %b %Y")],
    ]
    info_table = Table(info_data, colWidths=[3.5*cm, 5.5*cm, 3.5*cm, 5.5*cm])
    info_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTNAME", (2, 0), (2, -1), "Helvetica-Bold"),
        ("TEXTCOLOR", (0, 0), (0, -1), DARK),
        ("TEXTCOLOR", (2, 0), (2, -1), DARK),
        ("TEXTCOLOR", (1, 0), (1, -1), GRAY),
        ("TEXTCOLOR", (3, 0), (3, -1), GRAY),
        ("ROWPADDING", (0, 0), (-1, -1), 6),
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT_GRAY),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [WHITE, LIGHT_GRAY]),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
        ("ROUNDEDCORNERS", [4]),
    ]))
    story.append(info_table)
    story.append(Spacer(1, 0.4*cm))

    # ══════════════════════════════
    # ACTIVITY SUMMARY
    # ══════════════════════════════
    story.append(Paragraph("Monthly Activity Summary", section_style))

    stats = [
        ["📚 Doubts Asked",      str(student_data.get("doubts_asked", 0)),      "🎯 Study Streak",        f"{student_data.get('study_streak', 0)} days"],
        ["📝 Notes Generated",   str(student_data.get("notes_generated", 0)),   "🎮 Games Played",        str(student_data.get("games_played", 0))],
        ["📊 Mock Tests Taken",  str(len(student_data.get("mock_tests", []))),  "🏆 Coins Earned",        str(student_data.get("coins_earned", 0))],
        ["📋 HW Submitted",      str(student_data.get("homework_submitted", 0)), "⭐ Plan",               student_data.get("plan", "Free")],
    ]

    stats_table = Table(stats, colWidths=[4.5*cm, 2.5*cm, 4.5*cm, 2.5*cm])
    stats_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("FONTNAME", (1, 0), (1, -1), "Helvetica-Bold"),
        ("FONTNAME", (3, 0), (3, -1), "Helvetica-Bold"),
        ("TEXTCOLOR", (0, 0), (0, -1), DARK),
        ("TEXTCOLOR", (2, 0), (2, -1), DARK),
        ("TEXTCOLOR", (1, 0), (1, -1), ORANGE),
        ("TEXTCOLOR", (3, 0), (3, -1), ORANGE),
        ("ROWPADDING", (0, 0), (-1, -1), 8),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [WHITE, LIGHT_GRAY]),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
    ]))
    story.append(stats_table)
    story.append(Spacer(1, 0.4*cm))

    # ══════════════════════════════
    # MOCK TEST RESULTS
    # ══════════════════════════════
    mock_tests = student_data.get("mock_tests", [])
    if mock_tests:
        story.append(Paragraph("Mock Test Results", section_style))

        test_data = [["Subject", "Score", "Total", "Percentage", "Result"]]
        for test in mock_tests:
            score = test.get("score", 0)
            total = test.get("total", 100)
            pct = round((score / total) * 100, 1)
            result = "Pass ✓" if pct >= 40 else "Fail ✗"
            test_data.append([
                test.get("subject", "—"),
                str(score),
                str(total),
                f"{pct}%",
                result,
            ])

        test_table = Table(test_data, colWidths=[5*cm, 2.5*cm, 2.5*cm, 3.5*cm, 4.5*cm])
        test_table.setStyle(TableStyle([
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("BACKGROUND", (0, 0), (-1, 0), DARK),
            ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT_GRAY]),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
            ("ROWPADDING", (0, 0), (-1, -1), 7),
            ("ALIGN", (1, 0), (-1, -1), "CENTER"),
        ]))
        story.append(test_table)
        story.append(Spacer(1, 0.4*cm))

    # ══════════════════════════════
    # STRONG & WEAK SUBJECTS
    # ══════════════════════════════
    story.append(Paragraph("Subject Analysis", section_style))

    top = ", ".join(student_data.get("top_subjects", [])) or "—"
    weak = ", ".join(student_data.get("weak_subjects", [])) or "—"

    subject_data = [
        ["💪 Strong Subjects", top],
        ["⚠️  Weak Subjects",  weak],
    ]
    subject_table = Table(subject_data, colWidths=[5*cm, 13*cm])
    subject_table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("TEXTCOLOR", (0, 0), (0, 0), GREEN),
        ("TEXTCOLOR", (0, 1), (0, 1), RED),
        ("ROWPADDING", (0, 0), (-1, -1), 8),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.HexColor("#f0fdf4"), colors.HexColor("#fef2f2")]),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#e5e7eb")),
    ]))
    story.append(subject_table)
    story.append(Spacer(1, 0.4*cm))

    # ══════════════════════════════
    # AI RECOMMENDATION
    # ══════════════════════════════
    story.append(Paragraph("AI Recommendation", section_style))

    rec_text = student_data.get("ai_recommendation", "Keep up the good work!")
    rec_data = [[Paragraph(f"🤖  {rec_text}", normal_style)]]
    rec_table = Table(rec_data, colWidths=[18*cm])
    rec_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fff7ed")),
        ("ROWPADDING", (0, 0), (-1, -1), 12),
        ("GRID", (0, 0), (-1, -1), 1, ORANGE),
        ("ROUNDEDCORNERS", [6]),
    ]))
    story.append(rec_table)
    story.append(Spacer(1, 0.6*cm))

    # ══════════════════════════════
    # FOOTER
    # ══════════════════════════════
    story.append(HRFlowable(width="100%", thickness=1, color=LIGHT_GRAY))
    story.append(Spacer(1, 0.2*cm))
    story.append(Paragraph(
        "RAXX AI Technologies | India's Universal Study Platform | raxxai.com",
        ParagraphStyle("Footer", parent=styles["Normal"], fontSize=8, textColor=GRAY, alignment=TA_CENTER)
    ))
    story.append(Paragraph(
        f"Generated on {datetime.now().strftime('%d %B %Y at %I:%M %p')}",
        ParagraphStyle("Footer2", parent=styles["Normal"], fontSize=8, textColor=GRAY, alignment=TA_CENTER)
    ))

    doc.build(story)
    return output_path