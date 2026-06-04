function doGet(e) {
  return handleTranslation(e);
}

function doPost(e) {
  return handleTranslation(e);
}

function handleTranslation(e) {
  try {
    // ดึงค่าข้อความที่สแกนได้จาก Parameter
    var text = e.parameter.text;
    // 🌍 ฟีเชอร์สลับภาษา: รับค่าภาษาต้นฉบับจากหน้าบ้าน (ถ้าไม่มีให้ Default เป็น 'zh' หรือจีนตัวย่อ)
    var sourceLang = e.parameter.sourceLang || 'zh'; 
    
    // ดักจับกรณีเปิดลิงก์ทดสอบตรง ๆ หรือไม่มีการส่งข้อความมา
    if (!text || text.trim() === "") {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: true, 
        message: "ระบบหลังบ้าน (API) พร้อมใช้งานเต็มรูปแบบแล้วครับ!" 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 🌍 สั่งแปลภาษาไปยังภาษาไทย ('th') แบบ Dynamic ตามภาษาต้นฉบับที่เลือกมา
    var translatedText = LanguageApp.translate(text, sourceLang, 'th');
    
    var response = {
      success: true,
      originalText: text,
      translatedText: translatedText
    };
    
    // ส่งข้อมูลกลับเป็น JSON Format ที่ถูกต้องแม่นยำ
    return ContentService.createTextOutput(JSON.stringify(response))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
