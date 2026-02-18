# THE ZERO-TRUST MUTATION

## What Changed (and why it matters for adoption)

### BEFORE: Trust barrier
```
User runs codeawake
  ↓
ERROR: ANTHROPIC_API_KEY not found
  ↓
User must:
  1. Get API key
  2. Set environment variable
  3. Run again
  ↓
FRICTION = ABANDONMENT
```

### AFTER: Value first, trust later
```
User runs codeawake
  ↓
Generates LOCAL BRIEFING (no API needed)
  ↓
User sees immediate value
  ↓
"Run with API key for full briefing"
  ↓
User NOW motivated to configure
  ↓
ADOPTION
```

---

## What the Local Briefing Provides

**WITHOUT calling any API**, it analyzes:

✅ **Project type** - Node/Python/Django/Next.js detection  
✅ **Entry point** - Finds main.py, server.js, app.js, etc.  
✅ **Purpose** - Guesses from dependencies (Express=API, React=frontend)  
✅ **How to run** - npm start, python app.py, etc.  
✅ **Core files** - Entry point + config + routes  
✅ **Safe areas** - components/, styles/, public/  
✅ **Dangerous files** - config/, auth/, middleware/, .env  
✅ **Data flow** - Basic framework-specific patterns  
✅ **Start steps** - Actionable orientation checklist  

**This is enough to be useful.**

Then it says:
```
💡 This is a quick structural analysis.
   For a full senior-engineer briefing, set ANTHROPIC_API_KEY
```

---

## The Psychology

**People don't install tools because they're powerful.**

**People install tools because they were useful BEFORE commitment.**

Once codeawake orients a developer in one inherited codebase, they:
1. Keep it
2. Star it  
3. Fork it
4. Show a coworker

That's when GitHub notices activity.

---

## The Adoption Ladder

**Old flow (high friction):**
```
Setup → Effort → Maybe Value → Maybe Keep
```
95% abandon at "Setup"

**New flow (zero friction):**
```
Value → Curiosity → Setup → Adoption
```
Most people complete the ladder

---

## Testing Checklist

1. **Delete your API key** (to simulate first-time user)
```bash
unset ANTHROPIC_API_KEY
```

2. **Run codeawake on a project**
```bash
cd ~/some-project
codeawake
```

3. **Verify local briefing appears**
- Shows project type
- Identifies entry point
- Lists core/safe/dangerous files
- Ends with "Run with API key for full briefing"

4. **Set API key and run again**
```bash
export ANTHROPIC_API_KEY=your-key
codeawake
```

5. **Verify AI briefing appears**
- More detailed analysis
- Better purpose detection
- Actual code understanding

---

## What This Changes

### Before mutation:
- Requires 5 setup steps before value
- "Interesting idea" category
- High abandonment rate
- Few forks

### After mutation:
- Works immediately (1 command)
- Proves value in 30 seconds
- "Useful tool I rely on" category
- Adoption → forks → visibility

---

## The Critical Physics

**Forks don't come from:**
- People who understand your project
- People who read documentation
- People evaluating features

**Forks come from:**
- People who **accidentally discovered they rely on it**
- One successful use = permanent adoption

---

## Next Steps

1. **Add local-briefing.js to your project**
2. **Update briefing.js** (fallback instead of error)
3. **Update README** (emphasize zero-setup)
4. **Test locally without API key**
5. **Push to GitHub**
6. **Post in r/programming or Show HN**

The mutation is complete.

The tool now **gives value before asking for trust**.

That's the difference between a quiet repo and a spreading one.

---

## Files Updated

1. `lib/local-briefing.js` - NEW: Heuristic analysis without API
2. `lib/briefing.js` - MODIFIED: Fallback to local instead of error
3. `README.md` - MODIFIED: Emphasize zero-setup, explain two modes

Download these ⬆️ and replace in your codeawake folder.

---

**This is the last 15% that determines spread vs death.**

Ship it this weekend.
