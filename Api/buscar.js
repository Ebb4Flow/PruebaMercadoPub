export default async function handler(req, res) {
  const { fecha = "07172025", estado = "aceptada" } = req.query;
  const TICKET = "F8537A18-6766-4DEF-9E59-426B4FEE2844";

  const url = "https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json";
  const params = new URLSearchParams({
    fecha,
    estado,
    ticket: TICKET
  });

  try {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar la API" });
  }
}
