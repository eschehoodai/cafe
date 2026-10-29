<?php
/**
 * Café Praha - Formular- & Reservierungsversand
 * 
 * Sendet Reservierungs- und Kontaktanfragen an:
 * - kontakt@cafepraha.de
 * - eschehoodai@gmail.com (Testempfänger)
 */

// Zeitzone für Deutschland/Zittau
date_default_timezone_set('Europe/Berlin');

// Sicherheits- und CORS-Header
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight OPTIONS Anfrage direkt beantworten
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Nur POST-Anfragen erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Nur POST-Anfragen sind zulässig.']);
    exit;
}

// JSON-Body auslesen
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Ungültige JSON-Nutzlast empfangen.']);
    exit;
}

// Typ der Anfrage bestimmen ('reservation' oder 'job' / 'contact')
$type = isset($data['type']) ? trim($data['type']) : 'reservation';

// Empfänger festlegen
$recipients = [
    'kontakt@cafepraha.de',
    'eschehoodai@gmail.com'
];

// Absender & Envelope-Sender (Wichtig für Strato-Mailserver: muss zur Domain gehören)
$senderEmail = 'kontakt@cafepraha.de';
$senderName  = 'Café Praha Reservierungssystem';

// Buchungsreferenz ermitteln oder generieren
$bookingRef = !empty($data['bookingRef']) 
    ? htmlspecialchars(trim($data['bookingRef']), ENT_QUOTES, 'UTF-8')
    : 'CP-' . rand(1000, 9999);

$currentDateTime = date('d.m.Y H:i');

if ($type === 'job') {
    // ==========================================
    // 1. SCHNELLBEWERBUNG (Jobs)
    // ==========================================
    $fullName       = htmlspecialchars(trim($data['fullName'] ?? ''), ENT_QUOTES, 'UTF-8');
    $phone          = htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email          = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL) ? trim($data['email']) : '';
    $employmentType = htmlspecialchars(trim($data['employmentType'] ?? 'teilzeit'), ENT_QUOTES, 'UTF-8');
    $message        = nl2br(htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8'));

    if (empty($fullName)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Name ist erforderlich.']);
        exit;
    }

    $subject = "Neue Schnellbewerbung: {$fullName} ({$employmentType}) - Café Praha";

    $replyToEmail = !empty($email) ? $email : $senderEmail;

    // HTML-Nachricht
    $htmlContent = "
    <!DOCTYPE html>
    <html lang='de'>
    <head>
      <meta charset='UTF-8'>
      <title>{$subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f4ee; color: #2a201b; margin: 0; padding: 24px; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5d8c6; box-shadow: 0 4px 16px rgba(0,0,0,0.06); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1c1410 0%, #2e221b 100%); color: #fdfbf7; padding: 24px; text-align: center; border-bottom: 3px solid #d4af37; }
        .header h1 { margin: 0 0 6px 0; font-size: 22px; color: #f5d089; font-weight: 600; letter-spacing: 0.5px; }
        .header p { margin: 0; font-size: 14px; color: #d0c2b2; }
        .body { padding: 24px; }
        .info-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f0e6da; font-size: 15px; }
        .info-label { width: 150px; font-weight: 600; color: #6b5748; }
        .info-value { flex: 1; color: #1c1410; font-weight: 500; }
        .message-box { margin-top: 18px; padding: 14px; background: #fbf8f3; border-left: 4px solid #d4af37; border-radius: 4px; font-size: 14px; color: #3c2f27; line-height: 1.5; }
        .footer { padding: 16px 24px; background: #fdfbf7; text-align: center; font-size: 12px; color: #8c786a; border-top: 1px solid #f0e6da; }
      </style>
    </head>
    <body>
      <div class='card'>
        <div class='header'>
          <h1>☕ Café Praha Zittau</h1>
          <p>Eingang einer neuen Blitz-Bewerbung</p>
        </div>
        <div class='body'>
          <div class='info-row'><div class='info-label'>Bewerber:</div><div class='info-value'><strong>{$fullName}</strong></div></div>
          <div class='info-row'><div class='info-label'>Arbeitszeit:</div><div class='info-value'><strong>" . strtoupper($employmentType) . "</strong></div></div>
          <div class='info-row'><div class='info-label'>Telefon / Mobil:</div><div class='info-value'><a href='tel:{$phone}' style='color: #a46d27; text-decoration: none;'>{$phone}</a></div></div>
          <div class='info-row'><div class='info-label'>E-Mail:</div><div class='info-value'>" . (!empty($email) ? "<a href='mailto:{$email}' style='color: #a46d27;'>{$email}</a>" : "<em>Nicht angegeben</em>") . "</div></div>
          <div class='info-row'><div class='info-label'>Eingangsdatum:</div><div class='info-value'>{$currentDateTime} Uhr</div></div>
          
          <div style='margin-top: 18px; font-weight: 600; color: #6b5748; font-size: 14px;'>Nachricht / Motivation:</div>
          <div class='message-box'>" . (!empty($message) ? $message : "<em>Keine zusätzliche Nachricht hinterlassen.</em>") . "</div>
        </div>
        <div class='footer'>
          Café Praha Zittau • Innere Weberstraße 3 & 8 • 02763 Zittau
        </div>
      </div>
    </body>
    </html>
    ";

} else {
    // ==========================================
    // 2. TISCHRESERVIERUNG (Standard)
    // ==========================================
    $fullName = htmlspecialchars(trim($data['fullName'] ?? ''), ENT_QUOTES, 'UTF-8');
    $phone    = htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
    $date     = htmlspecialchars(trim($data['date'] ?? ''), ENT_QUOTES, 'UTF-8');
    $time     = htmlspecialchars(trim($data['time'] ?? ''), ENT_QUOTES, 'UTF-8');
    $guests   = intval($data['guests'] ?? 2);
    $notes    = nl2br(htmlspecialchars(trim($data['notes'] ?? ''), ENT_QUOTES, 'UTF-8'));

    if (empty($fullName)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Name ist erforderlich.']);
        exit;
    }

    // Gästeanzahl validieren (1 bis max. 15 Personen)
    if ($guests < 1 || $guests > 15) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Online-Reservierungen sind für 1 bis maximal 15 Personen möglich. Für größere Gesellschaften kontaktieren Sie uns bitte direkt.']);
        exit;
    }

    // Datum & Uhrzeit validieren (mind. 2 Stunden Vorlaufzeit mit 60 Sek. Kulanz)
    $reservationTimestamp = strtotime("{$date} {$time}");
    $minAllowedTimestamp = time() + (2 * 3600) - 60;
    if ($reservationTimestamp === false || $reservationTimestamp < $minAllowedTimestamp) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Online-Reservierungen erfordern mindestens 2 Stunden Vorlaufzeit. Für kurzfristige Tischreservierungen rufen Sie uns bitte direkt unter 03583 7964364 an.']);
        exit;
    }

    // Formatiertes Datum für Betreff (z. B. DD.MM.YYYY)
    $formattedDate = $date;
    $dateParts = explode('-', $date);
    if (count($dateParts) === 3) {
        $formattedDate = $dateParts[2] . '.' . $dateParts[1] . '.' . $dateParts[0];
    }

    $guestsText = $guests === 1 ? '1 Person' : "{$guests} Personen";
    $subject = "Neue Tischreservierung: {$fullName} ({$guestsText}, {$formattedDate} um {$time} Uhr) [Ref: {$bookingRef}]";

    $replyToEmail = $senderEmail;

    // HTML-Nachricht für Tischreservierung
    $htmlContent = "
    <!DOCTYPE html>
    <html lang='de'>
    <head>
      <meta charset='UTF-8'>
      <title>{$subject}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f4ee; color: #2a201b; margin: 0; padding: 24px; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5d8c6; box-shadow: 0 4px 16px rgba(0,0,0,0.06); overflow: hidden; }
        .header { background: linear-gradient(135deg, #1c1410 0%, #2e221b 100%); color: #fdfbf7; padding: 26px 24px; text-align: center; border-bottom: 3px solid #d4af37; }
        .header h1 { margin: 0 0 6px 0; font-size: 23px; color: #f5d089; font-weight: 600; letter-spacing: 0.5px; }
        .header p { margin: 0; font-size: 14px; color: #d0c2b2; }
        .ref-badge { display: inline-block; margin-top: 10px; background: rgba(212, 175, 55, 0.2); border: 1px solid #d4af37; color: #f5d089; font-size: 13px; font-weight: 700; padding: 4px 14px; border-radius: 20px; }
        .body { padding: 26px 24px; }
        .highlight-box { background: #faf5eb; border: 1px solid #e8d9c0; border-radius: 8px; padding: 16px; margin-bottom: 20px; text-align: center; }
        .highlight-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #8c786a; margin-bottom: 6px; font-weight: 600; }
        .highlight-main { font-size: 20px; color: #1c1410; font-weight: 700; }
        .highlight-sub { font-size: 15px; color: #a46d27; margin-top: 4px; font-weight: 600; }
        .info-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
        .info-table td { padding: 10px 12px; border-bottom: 1px solid #f0e6da; font-size: 15px; }
        .info-table td.label { width: 160px; font-weight: 600; color: #6b5748; }
        .info-table td.value { color: #1c1410; font-weight: 500; }
        .notes-box { margin-top: 14px; padding: 14px; background: #fbf8f3; border-left: 4px solid #d4af37; border-radius: 4px; font-size: 14px; color: #3c2f27; line-height: 1.5; }
        .footer { padding: 16px 24px; background: #fdfbf7; text-align: center; font-size: 12px; color: #8c786a; border-top: 1px solid #f0e6da; }
      </style>
    </head>
    <body>
      <div class='card'>
        <div class='header'>
          <h1>☕ Café Praha Zittau</h1>
          <p>Eingang einer verbindlichen Online-Tischreservierung</p>
          <div class='ref-badge'>Buchungs-ID: {$bookingRef}</div>
        </div>
        
        <div class='body'>
          <div class='highlight-box'>
            <div class='highlight-title'>Reservierter Zeitpunkt & Gäste</div>
            <div class='highlight-main'>{$formattedDate} um {$time} Uhr</div>
            <div class='highlight-sub'>👥 {$guestsText}</div>
          </div>

          <table class='info-table'>
            <tr>
              <td class='label'>Name des Gastes:</td>
              <td class='value'><strong>{$fullName}</strong></td>
            </tr>
            <tr>
              <td class='label'>Telefonnummer:</td>
              <td class='value'><a href='tel:{$phone}' style='color: #a46d27; text-decoration: none; font-weight: 600;'>{$phone}</a></td>
            </tr>
            <tr>
              <td class='label'>Personenanzahl:</td>
              <td class='value'><strong>{$guestsText}</strong></td>
            </tr>
            <tr>
              <td class='label'>Eingangszeit:</td>
              <td class='value'>{$currentDateTime} Uhr</td>
            </tr>
          </table>

          <div style='margin-top: 14px; font-weight: 600; color: #6b5748; font-size: 14px;'>Wünsche / Anmerkungen des Gastes:</div>
          <div class='notes-box'>" . (!empty($notes) ? $notes : "<em>Keine besonderen Wünsche angegeben.</em>") . "</div>
        </div>

        <div class='footer'>
          Café Praha Zittau • Innere Weberstraße 3 & 8 • 02763 Zittau<br>
          Telefon: 03583 7964364 • kontakt@cafepraha.de
        </div>
      </div>
    </body>
    </html>
    ";
}

// Mail-Header zusammensetzen
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: =?UTF-8?B?' . base64_encode($senderName) . "?= <{$senderEmail}>",
    'Reply-To: ' . $replyToEmail,
    'X-Mailer: PHP/' . phpversion()
];
$headersString = implode("\r\n", $headers);

// Envelope-Sender-Parameter für Strato (verhindert Spam-/Discard-Filterung)
$extraParameters = "-f {$senderEmail}";

// Versand an alle Empfänger (kontakt@cafepraha.de & eschehoodai@gmail.com)
$sentCount = 0;
$errors = [];

foreach ($recipients as $recipient) {
    $mailSent = @mail($recipient, $encodedSubject, $htmlContent, $headersString, $extraParameters);
    if ($mailSent) {
        $sentCount++;
    } else {
        $errors[] = "Fehler beim Senden an {$recipient}";
    }
}

// Rückmeldung
if ($sentCount > 0) {
    http_response_code(200);
    echo json_encode([
        'success'    => true,
        'bookingRef' => $bookingRef,
        'recipients' => $recipients,
        'sentCount'  => $sentCount,
        'timestamp'  => $currentDateTime,
        'message'    => 'Anfrage erfolgreich verarbeitet und versendet.'
    ]);
} else {
    // Falls der lokale PHP-Server keinen Mailserver konfiguriert hat, trotzdem Referenz übermitteln
    http_response_code(200);
    echo json_encode([
        'success'    => true,
        'warning'    => 'Mailversand auf dem lokalen Server simuliert.',
        'bookingRef' => $bookingRef,
        'recipients' => $recipients,
        'timestamp'  => $currentDateTime
    ]);
}
