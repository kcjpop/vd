export function Settings() {
  const voices = globalThis.window
    ? window.speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang.startsWith('en'))
    : []

  return (
    <div className="grid grid-cols-2 items-center">
      <p className="font-bold">Giọng đọc</p>
      <select className="rounded border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500">
        {voices.map((voice) => (
          <option value={voice.voiceURI} key={voice.voiceURI}>
            {voice.name} - {voice.lang}
          </option>
        ))}
      </select>
    </div>
  )
}
