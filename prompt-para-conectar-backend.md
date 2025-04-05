Ayudame a conectar estas preguntas con el backend que nos va a dar las recomendaciones
Para esto necesitamos
1. Tomar las respuestas y construir un string con las respuestas y respuestas algo similar a esto
"¿Qué tipo de mascota tienes?:Gato,¿Cuál es el tamaño de tu gato?:Pequeño (menos de 10kg),¿Cuál es la edad de tu gato?:Adulto (1-7 años),¿Cuál es el nivel de energía de tu gato?:Bajo (duerme mucho, juega poco),¿Cuánto tiempo al día dedicas a jugar con tu gato?:Menos de 15 minutos,¿Qué tipo de juguetes prefiere tu gato?:Ratones y juguetes pequeños,¿Dónde juega principalmente tu gato?:Solo en interiores,¿Tu gato disfruta de juguetes que hacen ruido (chirridos, campanillas, etc.)?:Sí, le encantan,¿Tiene tu gato alguna preferencia por ciertos materiales en sus juguetes?:No muestra preferencias claras,¿Tu gato disfruta de juguetes que requieren tu participación?:No, prefiere jugar solo,¿Qué tan importante es la estimulación mental para tu gato?:No parece necesitarla especialmente"
2. Ahora necesitamos llamar a la API del backend con el string de las respuestas
Este es un ejemplo del Curl 
curl --location 'http://localhost:8000/api/recommend' \
--header 'Content-Type: application/json' \
--data '{
    "formatted_quiz": "¿Qué tipo de mascota tienes?:Gato,¿Cuál es el tamaño de tu gato?:Pequeño (menos de 10kg),¿Cuál es la edad de tu gato?:Adulto (1-7 años),¿Cuál es el nivel de energía de tu gato?:Bajo (duerme mucho, juega poco),¿Cuánto tiempo al día dedicas a jugar con tu gato?:Menos de 15 minutos,¿Qué tipo de juguetes prefiere tu gato?:Ratones y juguetes pequeños,¿Dónde juega principalmente tu gato?:Solo en interiores,¿Tu gato disfruta de juguetes que hacen ruido (chirridos, campanillas, etc.)?:Sí, le encantan,¿Tiene tu gato alguna preferencia por ciertos materiales en sus juguetes?:No muestra preferencias claras,¿Tu gato disfruta de juguetes que requieren tu participación?:No, prefiere jugar solo,¿Qué tan importante es la estimulación mental para tu gato?:No parece necesitarla especialmente"
  }'
para este punto implementa esto de forma ordenada en una nuevo archivo de services o algo asi para mantener los request y conexion con el backend de forma ordenada

4. Mostrar un mensaje de cargando mientras se hace la peticion ya que como usa un LLM puede demorar un poco
5. Despues de tener la respuesta mostrar un nuevo componente o pantalla con los resultados
 Este es un ejemplo de la respuesta
{
    "summary_es": "El usuario necesita juguetes pequeños y ruidosos para su gato adulto de bajo nivel de energía, que juega principalmente solo en interiores y no requiere mucha estimulación mental.",
    "summary_en": "The user needs small, noisy toys for their adult low-energy cat, who mainly plays alone indoors and does not require much mental stimulation.",
    "products": [
        {
            "id": "B07RP1JTGG",
            "score": 0.4782463014125824,
            "name": "Gigwi Automatic Cat Toys Pack, Interactive Cat Toys Electronic Squeaky Animals Bird/Cricket/Mouse Sounds, Plush Toys for Cats to Play Alone, Play and Squeak Cat Toys for Indoor Cats Boredom,3 Pcs",
            "price": 15.99,
            "image_url": "https://m.media-amazon.com/images/I/71cwSWKm3YL.jpg",
            "product_link": "https://www.amazon.com/Gigwi-Interactive-Cricket-Squeaking-Boredom/dp/B07RP1JTGG",
            "search_query": "cat toys for indoor cats boredom",
            "explanation": "Este juguete automático emite sonidos de animales que atraerán la atención de tu gato, proporcionando una estimulación auditiva sin necesidad de que realice un esfuerzo físico excesivo, ideal para su bajo nivel de energía."
        },
        {
            "id": "B0DSVW8FBJ",
            "score": 0.4274207353591919,
            "name": "Woolbuddy Cat Toys - 3-Piece Fish Set for Bored Indoor Pets, Interactive Entertainment, Stimulating Play Without Catnip, Kitten Enrichment, Cute Must-Have Accessories, Gentle for Paws and Teeth",
            "price": 17.99,
            "image_url": "https://m.media-amazon.com/images/I/814HzTZLhLL.jpg",
            "product_link": "https://www.amazon.com/Woolbuddy-Cat-Toys-Interactive-Entertainment/dp/B0DSVW8FBJ",
            "search_query": "senior cat toys gentle interactive",
            "explanation": "El set de peces de Woolbuddy es suave y ligero, permitiendo que tu gato juegue de manera cómoda y divertida, ofreciendo un entretenimiento sencillo que satisface su necesidad de jugar solo en interiores."
        },
        {
            "id": "B0DW4G31JH",
            "score": 0.4236246347427368,
            "name": "Interactive Cat Toys Ball for Indoor Cats,[2025 Newly Upgraded] Agile Moving Cat Ball with Elastic Mesh Tail,Automatic Kitten Toys for Bored Indoor Adult Cats,Motion Activated (Burgundy)",
            "price": 16.99,
            "image_url": "https://m.media-amazon.com/images/I/61UKFXHx1DL.jpg",
            "product_link": "https://www.amazon.com/YVE-LIFE-Interactive-Automatic-Activated/dp/B0DW4G31JH",
            "search_query": "senior cat toys gentle interactive",
            "explanation": "Esta bola interactiva se activa por movimiento, lo que fomenta el juego independiente y ocasional de tu gato, proporcionando estimulación sin ser demasiado intensa, perfecta para un gato de bajo nivel de energía."
        }
    ]
}

Quiero tener cards en un carrusel la cual muestre la imagen (image_url), el nombre (name), el precio (price) y ademas de la explicacion (explanation) la cual indica por que el producto fue seleccionado
quiero que cuando se le de click a la card abra en un nuevo tab el link del producto (product_link)

6 Organiza la estructura de componentes como creas mas organizado para emcapuslar los compoentes de preguntas y resultados ademas de los servbicios y manejo de estados como cargando o donde se almacenan los resultados
