import { useState } from 'react'
import StartScreen from './screens/StartScreen'
import RulesScreen from './screens/RulesScreen'
import GameScreen from './screens/GameScreen'
import EndScreen from './screens/EndScreen'
import PhotosScreen from './screens/PhotosScreen.jsx'

export default function App() {
  const [screen, setScreen] = useState('start')
  const [result, setResult] = useState({ score: 0, shots: 0 })

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      {screen === 'start' && (
        <StartScreen onNext={() => setScreen('rules')} />
      )}
      {screen === 'rules' && (
        <RulesScreen onStart={() => setScreen('game')} />
      )}
      {screen === 'game' && (
        <GameScreen onEnd={(r) => { setResult(r); setScreen('end') }} />
      )}
      {screen === 'end' && (
        <EndScreen
          result={result}
          onReplay={() => setScreen('start')}
          onPhotos={() => setScreen('photos')}
        />
      )}
      {screen === 'photos' && (
        <PhotosScreen onBack={() => setScreen('end')} />
      )}
    </div>
  )
}