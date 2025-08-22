# FHC Frontend - Career Assessment Questionnaire

A technical task for Bright Network front-end engineer role. The project was to create career path test page that allowed users to select answers to the questions to a questionaire. All the questions were fetched from the provided endpoints and once all questions answered the user can press a finished button to submit all answers via a POST request. I deliberately kept dependencies **minimal** to demonstrate raw coding ability within a tight timeframe, focusing on **functionality, accessibility, and code quality** rather than heavy third-party tooling.

In a real production environment, I would:

- Add **state management** (e.g. Zustand or React Context) for scalability.
- Expand **accessibility** (full keyboard support, ARIA refinements, reduced-motion support) I believe implementing a strong WCAG standard is crucial for keeping users on a site and making it as inclusive as possible. .
- Implement **robust error handling** (retries, offline storage, user-facing feedback).
- Introduce **comprehensive testing** (unit, integration, accessibility, end-to-end).
- Improve **UX polish** (micro-interactions, production-grade animations, internationalisation).
- Add **Motion.js** for better user experience by providing smoother and more fluid animations

For the radio inputs I decided to use the orange colour instead of the blue as per the design because this gives a better contrast for users who have colour blindness or suffer with their sight. I would also like to add more animations to give a smooth more production look. However, I would also add reduce motion values so that the users can toggle animations. This is especially needed for users who experience extreme motion sickness.

Not using third party tools I found coding the questionaire a challenge to make is snap as per the design guides so an issue that took some time was a bug where if a radio was clicked the page would scroll. This was because the browsers default action is to bring a selected radio into the users focus point. To resolve this I has to detach the radios from the default behavior of the browser. Due to the short time limit I decided not to just focus on making the UI nice and instead chose to do a balance of implementing functionality and styling. The reason for this decision was so that the this test could not only see my accessibility and styling knowledge but also to see my React and TypeScript skills as well. I choose to use Tailwind CSS due to Bright Network migrating from Bootstrap to Tailwind so I would to display my knowledge using this CSS library. At my current position I work on transitioning the entire component library from vanilla CSS to Tailwind CSS for faster styling, for the team. However taking this approach of creating a balance as meant that I wasn't able to finish the design in the time set. There is a lot of tidying up left to do as well as apply styling as per the design guide. There are also bugs to resolve such as the page rendering the question list height even though the questions are hidden. I would have also have liked to completed the final modal for when the user submits the answers. I did original create the three card components but due to bug fixing I didn't have to finish them so I removed them from the project. Another production change that I would do would be to install SWR instead of using Axios. This is because using SWR instead of Axios offers several advantages for React applications, such as automatically caching data and keeping it up to date with background revalidation. It also ensures the UI always displays fresh information. SWR will also handle loading and error states out of the box, this reduces boilerplate code, and can optimistically update the interface after user actions. Additionally, it refetches data when the window regains focus or the network reconnects, something Axios alone does not provide. Overall, SWR simplifies data fetching while improving performance and user experience.

To demonstrate what I would also add to the project if I was making this in production, I installed linting and testing suites which I would use to enforce a consistent coding standard before submitting any work for pull request. I would also like to implement a proper image conversion and compression tool so modern images are severed instead of legacy ones.

### Time Analysis

- **Time advised:** 3 hours
- **Time taken:** 4 hours (current implementation and not including write-up)
- **Production estimate:** ~2 days to deliver a production-ready version (tests, accessibility review, error handling, and UX polish)

As show I did go slightly over the three hours because I want to focused on code quality, accessibility, and documenting production-ready improvements like Motion.js.

# Overall Summary

---

## ✨ Key Design Decisions

- **Minimal dependencies**: No slider/animation libraries (e.g. Motion.js _- used to be Framer Motion_) to highlight core engineering skills under time constraints.
- **Tailwind CSS v4**: Chosen for rapid iteration and to align with Bright Network’s migration from Bootstrap to Tailwind.
- **Accessibility first**:
  - High-contrast **orange** radio inputs for improved visibility for users with colour-vision deficiencies.
  - Planned **reduced-motion** support for users with vestibular disorders.
  - Touch targets sized to meet WCAG guidance.
- **Pragmatic trade-offs**: Prioritised functionality, accessibility, and type safety over pixel-perfect visuals due to the timeframe.

---

## 🔍 Challenges & Solutions

- **Scroll-snap + focus bug**: Clicking a radio caused the browser to auto-scroll to focus it. Resolved by preventing the default focus scroll and managing focus manually.
- **Slider vs scroll-snap**: Implemented CSS scroll-snap (`snap-y`, `snap-mandatory`) to mimic slider behaviour without a library.
- **Time constraints**: Balanced functional completeness and accessibility with styling; some polish and animations are intentionally deferred.

---

## 🧪 Quality & Testing

Planned for a production build:

- **Unit tests**: Question rendering, answer selection, persistence logic.
- **Integration tests**: End-to-end submission flow and API interactions.
- **Accessibility tests**: Automated checks with `axe-core`/`pa11y`.
- **End-to-end tests**: Full user journey with Cypress or Playwright.
- **Static analysis**: ESLint, Prettier, Stylelint (already configured).

---

## 📈 Scalability Considerations

- **State management**: Session Storage is sufficient here; in production I'd adopt Zustand for multi-page flows, persistence, and clearer separation of concerns.
- **Internationalisation**: Designed with future i18n in mind so that the page can support both UK and German languages.
- **Performance**:
  - Lazy-load large question groups.
  - Minimise re-renders with `React.memo` and stable props.
  - Image optimisation (modern formats and compression) in the pipeline.
- **Error handling**: User-friendly error states, retry strategies, and offline fallbacks for intermittent connectivity.
- **SWR**: Automatically caches responses, so repeated requests for the same data don’t hit the server unless needed. This improves performance and reduces server load.

---

## Installation

> **FYI**: I recommend using npm or pnpm for the best experience, but the library supports other package managers as well.

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YewTreeWeb/fhc-frontend
cd fhc-frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will start and run on localhost port `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Questionaire.tsx    # Main questionnaire container
│   ├── Question.tsx        # Individual question component
│   ├── Button.tsx          # Reusable button component
│   ├── Header.tsx          # Application header
│   └── Card.tsx           # Card wrapper components
├── types.d.ts             # TypeScript type definitions
├── index.css              # Global styles and Tailwind config
├── App.tsx                # Main application component
└── main.tsx               # Application entry point
```

## 🎯 How It Works

### Questionnaire Flow

1. **Loading**: Questions are fetched from the API
2. **Navigation**: Users scroll vertically to move between questions
3. **Answering**: Click on rating circles (0, 2-7) to select answers
4. **Progress**: Header shows completion percentage in real-time
5. **Persistence**: Answers are automatically saved to session storage
6. **Submission**: Completed questionnaire is submitted to the backend API

### Key Components

#### Questionaire Component

- Manages overall questionnaire state
- Handles API communication
- Tracks progress and completion
- Implements scroll-snap container

#### Question Component

- Renders individual questions with rating scale
- Handles user input and validation
- Provides accessibility features
- Prevents unwanted scrolling on interaction

### Git Workflow

```bash
pnpm commit       # Use Commitizen for conventional commits
```

## 🎨 Styling

The project uses **Tailwind CSS v4** with a custom theme:

```css
--color-header-grey: hsl(225, 29%, 97%) --color-primary: hsl(25, 92%, 62%)
  #Orange primary color --color-primary-dark: hsl(26, 77%, 55%) #Darker orange
  variant;
```

The new Tailwind completely removes the need for a JS config file allowing easier easier customization and fully support CSS variables.

### Scroll-Snap Implementation

The questionnaire uses CSS scroll-snap for navigating between questions. I choose this over a slider to show what I could code within the time limit. If I was to do this again with not sure a constricted timeline I would have used a minimal slider:

- Container: `snap-y snap-mandatory`
- Questions: `snap-start` with fixed height
- Smooth scrolling behavior for better UX

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind responsive utilities
- **Touch-friendly** radio buttons (48x48px minimum)
- **Optimized scrolling** for mobile devices
- **Accessible** on all screen sizes

## ♿ Accessibility Features

- **ARIA labels** and descriptions for all interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** to prevent unwanted scrolling
- **Semantic HTML** structure
- **High contrast** design for better visibility

## 🔧 Configuration

### Environment Setup

The project includes comprehensive tooling:

- **TypeScript** for type safety
- **ESLint** with React and accessibility rules
- **Prettier** for code formatting
- **Stylelint** for CSS linting
- **Husky** for git hooks
- **Commitizen** for conventional commits

### API Integration

Questions are fetched from: `https://fhc-api.onrender.com/`
Submissions are sent to: `https://fhc-api.onrender.com/submissions?user={user}`

## 🚀 Deployment

```bash
# Build for production
pnpm build

# The dist/ folder contains the built application
# Deploy the contents to your hosting provider
```

## Appendix

### Package Manager Comparison: npm vs pnpm

I always prefer to use **pnpm** over npm. Here's why I always recommend pnpm:

#### Why pnpm is Faster

**1. Symlinked Node Modules**

- pnpm creates a single, global store for all packages
- Instead of copying packages to each project, it creates symlinks
- This dramatically reduces disk space usage and installation time

**2. Parallel Installation**

- pnpm installs dependencies in parallel by default
- npm installs dependencies sequentially (though npm 7+ has some parallelization)

**3. Smart Dependency Resolution**

- pnpm uses a content-addressable store
- Identical packages are stored only once, regardless of version
- Faster resolution of complex dependency trees

#### Performance Comparison

| Metric           | npm      | pnpm            | Improvement |
| ---------------- | -------- | --------------- | ----------- |
| Install Speed    | Baseline | **2-3x faster** | 🚀          |
| Disk Space       | Baseline | **50-70% less** | 💾          |
| Cache Efficiency | Good     | **Excellent**   | ⚡          |
| Monorepo Support | Basic    | **Advanced**    | 🏗️          |

#### Key Differences

**npm (Node Package Manager)**

- ✅ Default package manager for Node.js
- ✅ Widely adopted and supported
- ❌ Slower installation times
- ❌ Higher disk space usage
- ❌ Potential for dependency conflicts

**pnpm (Performant npm)**

- ✅ **2-3x faster** installation
- ✅ **50-70% less** disk space usage
- ✅ Strict dependency isolation (prevents phantom dependencies)
- ✅ Better monorepo support
- ✅ Compatible with npm's package.json and lockfiles
- ❌ Smaller ecosystem adoption (though growing rapidly)

#### When to Use Each

**Use pnpm when:**

- Performance is important (recommended for this project)
- Working with monorepos
- Disk space is a concern
- You want strict dependency management

**Use npm when:**

- Working in environments where pnpm isn't available
- Legacy projects that specifically require npm
- CI/CD systems that don't support pnpm (rare)

#### Migration from npm to pnpm

If you're currently using npm, migrating to pnpm is straightforward:

```bash
# Remove npm's node_modules and lockfile
rm -rf node_modules package-lock.json

# Install pnpm globally
npm install -g pnpm

# Install dependencies with pnpm
pnpm install
```

> **Note**: pnpm automatically reads and respects your existing `package.json` file. No changes needed!

#### Additional pnpm Conveniences

**Script Execution Without 'run'**

One of pnpm's convenient features is that you can execute package.json scripts without the `run` command:

```bash
# npm way (verbose)
npm run lint
npm run test
npm run build
npm run dev

# pnpm way (concise)
pnpm lint
pnpm test
pnpm build
pnpm dev
```

**Common Commands Comparison**

| Task                 | npm                     | pnpm                  |
| -------------------- | ----------------------- | --------------------- |
| Install dependencies | `npm install`           | `pnpm install`        |
| Add package          | `npm install package`   | `pnpm add package`    |
| Remove package       | `npm uninstall package` | `pnpm remove package` |
| Run linting          | `npm run lint`          | `pnpm lint`           |
| Run tests            | `npm run test`          | `pnpm test`           |
| Run build            | `npm run build`         | `pnpm build`          |
| Start dev server     | `npm run dev`           | `pnpm dev`            |
| Format code          | `npm run format`        | `pnpm format`         |

> **💡 Tip**: For this project, you can use `pnpm lint`, `pnpm test`, `pnpm build`, etc. instead of the longer `pnpm run lint` syntax!
