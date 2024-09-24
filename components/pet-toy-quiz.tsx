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
    options: ["Perro", "Gato", "Otro"],
    icon: <Dog className="w-8 h-8" />
  },
  {
    id: "size",
    text: "¿Cuál es el tamaño de tu [mascota]?",
    options: ["Pequeño", "Mediano", "Grande"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => ["Perro", "Gato"].includes(answers.petType)
  },
  {
    id: "age",
    text: "¿Cuál es la edad de tu [mascota]?",
    options: ["Cachorro/Kitten", "Adulto", "Senior"],
    icon: <Cat className="w-8 h-8" />,
    condition: (answers) => ["Perro", "Gato"].includes(answers.petType)
  },
  {
    id: "energyLevel",
    text: "¿Cuál es el nivel de energía tu [mascota]?",
    options: ["Bajo", "Moderado", "Alto"],
    icon: <Rabbit className="w-8 h-8" />
  },
  {
    id: "toyDogPreference",
    text: "¿Cuál de estos tipos juguetes parece gustarle más a tu [mascota]?",
    options: ["Pelotas", "Juguetes de cuerda", "Juguetes de peluche", "Juguetes interactivos (rompecabezas, dispensadores de comida)", "Juguetes para morder"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => ["Moderado", "Alto"].includes(answers.energyLevel) && answers.petType === "Perro"
  },
  {
    id: "toyCatPreference",
    text: "¿Cuál de estos tipos juguetes parece gustarle más a tu [mascota]?",
    options: ["Ratones de peluche", "Cajas y túneles", "Plumas o juguetes colgantes", "Juguetes interactivos (rompecabezas, dispensadores de comida)", "Juguetes con luces o láser"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => ["Moderado", "Alto"].includes(answers.energyLevel) && answers.petType === "Gato"
  },
  {
    id: "chewingHabits",
    text: "¿Tu perro es un masticador agresivo?",
    options: ["Sí", "No"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => answers.petType === "Perro" && answers.toyPreference === "Juguetes para morder"
  },
  {
    id: "playEnvironment",
    text: "¿Dónde prefiere jugar tu [mascota]?",
    options: ["En interiores", "Al aire libre", "Ambos"],
    icon: <Cat className="w-8 h-8" />,
    condition: (answers) => answers.energyLevel === "Alto" || ["Juguetes interactivos", "Pelotas"].includes(answers.toyPreference)
  },
  {
    id: "materialSensitivity",
    text: "¿Tiene tu [mascota] alguna sensibilidad o preferencia específica de materiales en juguetes?",
    options: ["No", "Prefiere juguetes sin plástico", "Prefiere juguetes de tela suave", "Prefiere juguetes de goma"],
    icon: <Dog className="w-8 h-8" />,
    condition: (answers) => ["Juguetes de peluche", "Juguetes para morder"].includes(answers.toyPreference)
  },
  {
    id: "interactiveInterest",
    text: "¿Tu [mascota] disfruta de juguetes interactivos o con desafíos mentales?",
    options: ["Sí", "No"],
    icon: <Cat className="w-8 h-8" />,
    condition: (answers) => answers.petType === "Gato" || answers.energyLevel === "Alto"
  },
  {
    id: "additionalComments",
    text: "¿Hay algo más que debamos saber sobre las preferencias de tu [mascota]?",
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
                  {currentQuestion.text.replace("[mascota]", ["Perro", "Gato"].includes(answers.petType) ?  answers.petType : "mascota")}
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
                    <h3 className="font-bold text-purple-700">{question?.text.replace("[mascota]", answers.petType || "mascota")}</h3>
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