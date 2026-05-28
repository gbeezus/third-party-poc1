import { Metadata } from 'next';
import { Button, LinkButton } from '~components/Button/Button';
import Card from '~components/Card/Card';
import styles from './tool.module.css';

const title = 'AI Assistant — third-party tool';

export const metadata: Metadata = {
  title,
  description:
    'POC stand-in for the third-party AI tool. The shell rebrands this surface via DTCG JSON upload (Mechanism A) or a shell-hosted CSS link (Mechanism B).',
};

function Tool() {
  return (
    <main className={styles.main}>
      <header className={styles.toolbar}>
        <div className={styles.brand}>
          <span className={styles.badge}>AI</span>
          <span className={styles.title}>Assistant</span>
        </div>
        <nav className={styles.nav}>
          <a href="#">History</a>
          <a href="#">Saved prompts</a>
          <a href="#">Settings</a>
        </nav>
      </header>

      <section className={styles.section}>
        <h1>Ask the assistant</h1>
        <p>
          This is a stand-in for the third-party tool. The visual brand —
          colors, typography, and accents — is supplied from outside this
          codebase, by the shell application. Try the two themes by changing
          presets in the shell admin.
        </p>

        <form className={styles.prompt} aria-label="Prompt form">
          <label htmlFor="prompt">Prompt</label>
          <textarea
            id="prompt"
            name="prompt"
            rows={4}
            placeholder="Summarize the latest agency policy memo…"
            defaultValue=""
          />
          <div className={styles.actions}>
            <Button label="Send" variant="primary" />
            <Button label="Save draft" variant="secondary" />
            <Button label="Clear" variant="danger" />
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <h2>Recent responses</h2>
        <div className={styles.cards}>
          <Card
            title="Policy summary"
            date="2026-05-12"
            url="#"
            readMore
            tags={[
              { title: 'policy', url: '#' },
              { title: 'briefing', url: '#' },
            ]}
          >
            <p>
              The agency has updated guidance on remote-work eligibility. Key
              changes include expanded telework for grade GS-13 and above…
            </p>
          </Card>
          <Card
            title="Meeting minutes"
            date="2026-05-09"
            url="#"
            readMore
            tags={[{ title: 'minutes', url: '#' }]}
          >
            <p>
              The Wednesday standing meeting covered Q3 milestones, budget
              reallocations, and the upcoming compliance review…
            </p>
          </Card>
          <Card
            title="Memo draft"
            date="2026-05-04"
            url="#"
            readMore
            tags={[
              { title: 'draft', url: '#' },
              { title: 'urgent', url: '#' },
            ]}
          >
            <p>
              Draft memo to leadership outlining the proposed shell-application
              integration. Three options are considered…
            </p>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Useful links</h2>
        <p>
          <a href="#">Documentation</a>
          {' · '}
          <a href="#">API reference</a>
          {' · '}
          <a href="#">Contact support</a>
        </p>
        <div>
          <LinkButton label="Open dashboard" href="#" variant="primary" />
        </div>
      </section>
    </main>
  );
}

export default Tool;
