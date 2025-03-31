"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Dog, Cat, Rabbit } from "lucide-react"

type Question = {
  id: string
  text: string
  options: string[]
  icon: React.ReactNode
  condition?: (answers: Record<string, string>) => boolean
}

const questions: Question[] = [
  {
    id: "petType",
    text: "¿Qué tipo de mascota tienes?",
    options: ["Perro", "Gato", "Conejo", "Otro"],
    icon: <Dog className="w-8 h-8" />
  },
  {
    id: "size",
    text: "¿Cuál es el tamaño de tu [mascota]?",
    options: ["Pequeño (menos de 10kg)", "Mediano (10-25kg)", "Grande (más de 25kg)"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => ["Perro", "Gato", "Conejo"].includes(answers.petType)
  },
  {
    id: "age",
    text: "¿Cuál es la edad de tu [mascota]?",
    options: ["Cachorro/Joven (menos de 1 año)", "Adulto (1-7 años)", "Senior (más de 7 años)"],
    icon: <Cat className="w-8 h-8" />,
    condition: (answers) => ["Perro", "Gato", "Conejo"].includes(answers.petType)
  },
  {
    id: "energyLevel",
    text: "¿Cuál es el nivel de energía de tu [mascota]?",
    options: ["Bajo (duerme mucho, juega poco)", "Moderado (equilibrado entre descanso y juego)", "Alto (muy activo, necesita mucha estimulación)"],
    icon: <Rabbit className="w-8 h-8" />
  },
  {
    id: "playTime",
    text: "¿Cuánto tiempo al día dedicas a jugar con tu [mascota]?",
    options: ["Menos de 15 minutos", "Entre 15-30 minutos", "Más de 30 minutos"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => answers.energyLevel !== "Bajo"
  },
  {
    id: "toyDogPreference",
    text: "¿Qué tipo de juguetes prefiere tu perro?",
    options: ["Pelotas y juguetes para lanzar", "Juguetes de cuerda para tirar", "Juguetes de peluche", "Juguetes interactivos o dispensadores", "Juguetes para morder o masticar"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => answers.petType === "Perro"
  },
  {
    id: "toyCatPreference",
    text: "¿Qué tipo de juguetes prefiere tu gato?",
    options: ["Ratones y juguetes pequeños", "Túneles y escondites", "Juguetes con plumas o colgantes", "Juguetes interactivos o dispensadores", "Juguetes con luces o láser"],
    icon: <Cat className="w-8 h-8" />,
    condition: (answers) => answers.petType === "Gato"
  },
  {
    id: "toyRabbitPreference",
    text: "¿Qué tipo de juguetes prefiere tu conejo?",
    options: ["Juguetes para masticar", "Túneles y escondites", "Juguetes para empujar", "Juguetes interactivos o dispensadores"],
    icon: <Rabbit className="w-8 h-8" />,
    condition: (answers) => answers.petType === "Conejo"
  },
  {
    id: "toyOtherPreference",
    text: "¿Qué tipo de juguetes prefiere tu mascota?",
    options: ["Juguetes para masticar", "Túneles y escondites", "Juguetes para empujar", "Juguetes interactivos o dispensadores"],
    icon: <Rabbit className="w-8 h-8" />,
    condition: (answers) => answers.petType === "Otro"
  },
  {
    id: "chewingHabits",
    text: "¿Tu mascota es un masticador agresivo?",
    options: ["Sí, destruye juguetes rápidamente", "Moderado, los juguetes duran un tiempo razonable", "No, es muy cuidadoso con sus juguetes"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => ["Juguetes para morder o masticar", "Juguetes para masticar"].includes(answers.toyDogPreference) || ["Juguetes para masticar"].includes(answers.toyRabbitPreference) || ["Juguetes para masticar"].includes(answers.toyOtherPreference)
  },
  {
    id: "playEnvironment",
    text: "¿Dónde juega principalmente tu [mascota]?",
    options: ["Solo en interiores", "Principalmente al aire libre", "Tanto en interiores como exteriores"],
    icon: <Cat className="w-8 h-8" />
  },
  {
    id: "noisePreference",
    text: "¿Tu [mascota] disfruta de juguetes que hacen ruido (chirridos, campanillas, etc.)?",
    options: ["Sí, le encantan", "Le son indiferentes", "No, les tiene miedo o no muestra interés"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => answers.petType !== "Otro"
  },
  {
    id: "materialSensitivity",
    text: "¿Tiene tu [mascota] alguna preferencia por ciertos materiales en sus juguetes?",
    options: ["Prefiere juguetes de goma o plástico duro", "Prefiere juguetes de tela o peluche", "Prefiere juguetes naturales (madera, sisal, etc.)", "No muestra preferencias claras"],
    icon: <Dog className="w-8 h-8" />
  },
  {
    id: "interactiveInterest",
    text: "¿Tu [mascota] disfruta de juguetes que requieren tu participación?",
    options: ["Sí, prefiere jugar conmigo", "A veces, depende de su humor", "No, prefiere jugar solo"],
    icon: <Cat className="w-8 h-8" />
  },
  {
    id: "mentalStimulation",
    text: "¿Qué tan importante es la estimulación mental para tu [mascota]?",
    options: ["Muy importante, necesita desafíos mentales", "Moderadamente importante", "No parece necesitarla especialmente"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => answers.energyLevel !== "Bajo" || answers.age === "Senior (más de 7 años)"
  },
  {
    id: "additionalComments",
    text: "¿Hay algo más que debamos saber sobre las preferencias de juego de tu [mascota]?",
    options: [],
    icon: <Rabbit className="w-8 h-8" />
  }
]

export function PetToyQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(newAnswers)

    const nextQuestionIndex = questions.findIndex((q, index) =>
      index > currentQuestionIndex && (!q.condition || q.condition(newAnswers))
    )

    if (nextQuestionIndex !== -1) {
      setCurrentQuestionIndex(nextQuestionIndex)
    } else {
      setShowResults(true)
    }
  }

  const handleTextAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = { ...answers, [currentQuestion.id]: event.target.value }
    setAnswers(newAnswers)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
  }

  const totalQuestionsLeft = questions.filter((q, index) => index > currentQuestionIndex && (!q.condition || q.condition(answers))).length
  const totalQuestions = (Object.keys(answers).length + totalQuestionsLeft)
  const progress = (Object.keys(answers).length / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex items-center justify-center p-4" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a78bfa' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}>
      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-purple-700">
            Descubre el juguete ideal para tu mascota
          </CardTitle>
          {!showResults && (
            <p className="text-purple-600 mt-1">Responde estas preguntas para encontrar los mejores juguetes</p>
          )}
        </CardHeader>
        <CardContent>
          {!showResults && (
            <>
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentQuestion.icon}
                </motion.div>
              </div>
              <Progress value={progress} className="mb-6" />
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold mb-4 text-purple-800">
                  {currentQuestion.text.replace("[mascota]", ["Perro", "Gato", "Conejo"].includes(answers.petType) ? answers.petType.toLowerCase() : "mascota")}
                </h2>
                {currentQuestion.options.length > 0 ? (
                  <RadioGroup onValueChange={handleAnswer} className="space-y-2">
                    {currentQuestion.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-100 transition-colors">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="flex-grow cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <>
                    <Textarea
                      placeholder="Escribe tus comentarios aquí..."
                      onChange={handleTextAnswer}
                      className="w-full h-32"
                    />
                    <Button onClick={() => setShowResults(true)} className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                      Terminar
                    </Button>
                  </>
                )}
              </motion.div>
            </>
          )}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-purple-800">Resumen de tus respuestas:</h2>
              {Object.entries(answers).map(([questionId, answer]) => {
                const question = questions.find(q => q.id === questionId)
                return (
                  <div key={questionId} className="mb-4 bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-purple-700">{question?.text.replace("[mascota]", answers.petType ? answers.petType.toLowerCase() : "mascota")}</h3>
                    <p className="text-purple-600">{answer}</p>
                  </div>
                )
              })}

              <Button onClick={resetQuiz} className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                Comenzar de nuevo
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}