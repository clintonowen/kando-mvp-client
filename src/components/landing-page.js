import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './landing-page.css';

export function LandingPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/board" />;
  }
  return (
    <main role="main" className="overview">
      <h2>
        Get organized. Stay focused. <strong>Do more.</strong>
      </h2>
      <p>
      <strong className="kando">KanDo</strong> is a productivity tool which combines the organizational philosophies of <a href="#personal-kanban">Personal Kanban</a> with the time management system of the <a href="#pomodoro-technique">Pomodoro Technique</a>.
      </p>
      <p>
        <a href="#personal-kanban">Kanban</a>? <a href="#pomodoro-technique">Pomodoro</a>? What are these wacky terms? Continue below to find out how <strong className="kando">KanDo</strong> combines these methodologies to help you <em>do more</em>.
      </p>
      <hr></hr>
      <section className="newuser-link">
        Ready to get started?<br></br>
        <Link to="/signup">Sign up now</Link> and get organized with your first <strong className="kando">KanDo</strong> board.
      </section>
      <hr></hr>
      <h3 id="personal-kanban">Personal Kanban</h3>
      <p>
        <em>Personal Kanban</em> is a highly-visual approach to managing work that allows you to quickly get an overview of your task list, prioritize what needs to be done, and plan your day.
      </p>
      <p>
        The Basic Steps:
        <ol>
          <li>
            Your <strong className="kando">KanDo</strong> board is split into four columns: <em>To-Do</em>, <em>Do Today</em>, <em>In Progress</em>, and <em>Done</em>. Step one is to create an overall list of tasks in the <em>To-Do</em> column. Ideally, any large or ongoing projects should be split up into separate, manageable tasks on your <strong className="kando">KanDo</strong> board.
          </li>
          <li>
            At the start of each day, decide which tasks you'd like to accomplish and move them over to the next column, <em></em>Do Today.
          </li>
          <li>
            Now you're ready to start working. Select your first task, move it to the <em>In Progress</em> column, and get busy. As you work, use the built-in <a href="#pomodoro-technique">Pomodoro Timer</a> to manage your time. Try to limit yourself to no more than 3 tasks at a time in your <em>In Progress</em> column—the idea is to focus on a task and get it <em>Done</em>.
          </li>
          <li>
            As you complete tasks from your <em>In Progress</em> column, enjoy the satisfaction of moving them to the <em>Done</em> column. Nice work!
          </li>
        </ol>
      </p>
      <hr></hr>
      <h3 id="pomodoro-technique">The Pomodoro Technique</h3>
      <p>
        If you've ever stayed up late working on a project, you know that an overworked mind is a less productive mind. Mental burnout leads to a lower quality and quantity of work. In order to stay fresh and boost your productivity, it is recommended to take regular breaks and allow your brain to recharge.
      </p>
      <p>
        <em>The Pomodoro Technique</em> is a strategy for structuring your work and break sessions at regular intervals in order to stay at peak performance throughout the day.
      </p>
      <p>
        The Basic Steps:
        <ol>
          <li>
            Select a task from your <strong className="kando">KanDo</strong> board to work on.
          </li>
          <li>
            Start the Pomodoro Timer and aim to spend <em>25 uninterrupted minutes</em> focused on the selected task.
          </li>
          <li>
            When the Timer finishes, take a <em>5-minute break</em>. Meditate, stretch, go for a walk—however you prefer to recharge, the goal is to avoid anything work-related.
          </li>
          <li>
            Once your break is over, begin your next <em>Pomodoro</em> (25 minutes of work followed by a 5-minute break).
          </li>
          <li>
            After every 4th work session, take a longer, <em>15 to 30-minute break</em>. Not only will this let you rest up for the next round of Pomodoros, but it allows you to properly digest and reflect upon your work—you may find that your best ideas or revelations come during these extended breaks.
          </li>
        </ol>
      </p>
      <hr></hr>
      <section className="newuser-link">
      Congratulations! You're now ready to do more with <strong className="kando">KanDo</strong>.<br></br>
        <Link to="/signup">Sign up now</Link> and get organized.
      </section>
    </main>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
