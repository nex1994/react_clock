import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  hasClock: boolean;
  clockName: string;
  today: Date;
};

export class App extends React.Component<{}, State> {
  state = {
    hasClock: true,
    clockName: 'Clock-0',
    today: new Date(),
  };

  timerId: number = 0;

  ticks: number = 0;

  tick = () => {
    return new Date();
  };

  hideCloack = () => {
    window.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      this.setState({ hasClock: false });
    });
  };

  showCloack = () => {
    window.addEventListener('click', () => this.setState({ hasClock: true }));
  };

  componentDidUpdate(
    _prevProps: Readonly<{}>,
    prevState: Readonly<State>,
  ): void {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  componentDidMount() {
    this.ticks = window.setInterval(() => {
      this.setState({ today: this.tick() });
      if (this.state.hasClock) {
        // eslint-disable-next-line no-console
        console.log(this.tick().toUTCString().slice(-12, -4));
      }
    }, 1000);

    this.timerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    this.showCloack();
    this.hideCloack();
  }

  componentWillUnmount() {
    window.clearInterval(this.ticks);
    window.clearInterval(this.timerId);
    window.removeEventListener('click', () => {});
    window.removeEventListener('contextmenu', () => {});
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>React Clock</h1>
          {this.state.hasClock && (
            <div className="Clock" onClick={(this.showCloack, this.hideCloack)}>
              <strong className="Clock__name">{this.state.clockName}</strong>

              {' time is '}

              <span className="Clock__time">
                {this.tick().toUTCString().slice(-12, -4)}
              </span>
            </div>
          )}
        </div>
      </>
    );
  }
}

// export const App2: React.FC = () => {
//   const today = new Date();
//   let clockName = 'Clock-0';

//   // This code starts a timer
//   const timerId = window.setInterval(() => {
//     clockName = getRandomName();
//   }, 3300);

//   // this code stops the timer
//   window.clearInterval(timerId);

//   return (
//     <div className="App">
//       <h1>React clock</h1>

//       <div className="Clock">
//         <strong className="Clock__name">{clockName}</strong>

//         {' time is '}

//         <span className="Clock__time">
//           {today.toUTCString().slice(-12, -4)}
//         </span>
//       </div>
//     </div>
//   );
// };
