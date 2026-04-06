import re

with open('components/settings/audio-settings.tsx', 'r') as f:
    content = f.read()

replacement = """              </div>
            </>
          )}

          <TTSVoiceList />
        </div>
      </div>

      {/* ASR Section */}"""

content = content.replace("""              </div>
            </>
          )}
        </div>
      </div>

      {/* ASR Section */}""", replacement)

with open('components/settings/audio-settings.tsx', 'w') as f:
    f.write(content)
