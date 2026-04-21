export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const KOMMO_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkY2E0OGQyNDQzNThmMDE0OGRhZGQzM2MxM2NhMzg1YTcxZGVjMDRkZmQzMTVmNzQxOGY1ODAxOTEwYWYwMjI2NzgwMzllOGRhZjVlNzJmIn0.eyJhdWQiOiI3YzljOWU0Yy05ZTFjLTQ0YWEtYjY1Mi0zNWIwZTAwY2RhOWUiLCJqdGkiOiIzZGNhNDhkMjQ0MzU4ZjAxNDhkYWRkMzNjMTNjYTM4NWE3MWRlYzA0ZGZkMzE1Zjc0MThmNTgwMTkxMGFmMDIyNjc4MDM5ZThkYWY1ZTcyZiIsImlhdCI6MTc3NDM2NTA1MSwibmJmIjoxNzc0MzY1MDUxLCJleHAiOjE5MDY0MTYwMDAsInN1YiI6IjE0OTE2Mzk1IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjM2MTczNzExLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiYmYwYzM3ZTItZDI0ZS00NzFmLTg3ZjAtNGZlNTQ5MmI5NjU3IiwiYXBpX2RvbWFpbiI6ImFwaS1jLmtvbW1vLmNvbSJ9.QDtrQqYG1YJ-8A4Kr1VhlRdF2mgcy0sVEUL8HpSMiAshKue_yf7-nJFtir_3pQRAcIqyuodS116z8bWtKjYT6scvI0xpnhJ-i6GfbM4upiCExuIqUJ7TJCKFRPROGKjVg2ji-6wdrqrwDWifpSL4NmiS49XbH6XDYvKhsta4JguxOhoqgawZhxpdh3y9aANQPknob5l4DygP0yC7_2hhzfQiuyQocY5ai2b01chw6U7FVxelCiW0K_ZXBZf2IxYOTAD-o_CedIGUjJ2nKgynd7ne1N4l-m74XPpO2V2PDlmoFMZUsBBFAAMxqzJ1orGkF-O8afj-naeggbWcBfAEXQ';
  const KOMMO_BASE = 'https://pedropablocastro1995.kommo.com';

  try {
    const data = req.body;

    // --- 1. Preparar el Lead para el Pipeline de Atria Venta ---
    const leadName = `Atria Venta - ${data.interest === 'inversion' ? 'Inversión' : 'Residencia'}: ${data.name}`;

    const kommoPayload = [
      {
        "name": leadName,
        "pipeline_id": 13529879,
        "_embedded": {
          "tags": [
            { "name": "Atria Venta" }
          ],
          "contacts": [
            {
              "name": data.name,
              "custom_fields_values": [
                { "field_code": "EMAIL", "values": [{ "value": data.email }] },
                { "field_code": "PHONE", "values": [{ "value": data.phone }] }
              ]
            }
          ]
        }
      }
    ];

    // Create the lead
    const kommoResponse = await fetch(`${KOMMO_BASE}/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KOMMO_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(kommoPayload)
    });

    if (kommoResponse.ok || kommoResponse.status === 200 || kommoResponse.status === 201) {
      // Attach note with lead details
      try {
        const responseData = await kommoResponse.json();
        const leadId = responseData[0].id;
        console.log(`[ATRIA VENTA] Lead created: ${leadId} in pipeline 13529879`);

        const noteText = `📌 LEAD ATRIA VENTA\n\nNombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\nInterés: ${data.interest === 'inversion' ? 'Inversión' : 'Residencia'}\nPresupuesto: ${data.budget || 'No especificado'}\n\nFuente: Landing Page Atria Stays - Barrio de Salamanca`;

        await fetch(`${KOMMO_BASE}/api/v4/leads/notes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${KOMMO_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([{
            "entity_id": leadId,
            "note_type": "common",
            "params": { "text": noteText }
          }])
        });
      } catch (noteErr) {
        console.error("[ATRIA VENTA] Note attachment failed:", noteErr);
      }

      return res.status(200).json({ success: true });
    } else {
      const errText = await kommoResponse.text();
      console.error("[ATRIA VENTA] Kommo API Error:", errText);
      return res.status(kommoResponse.status).json({ error: 'Error del servidor CRM externo', details: errText });
    }
  } catch (err) {
    console.error("[ATRIA VENTA] Server Error:", err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
