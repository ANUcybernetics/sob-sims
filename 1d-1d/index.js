import p5 from "p5";

const sketch = (p) => {
  const N = 100;
  const AGENT_RADIUS = 20;
  const DISTANCE_EXPONENT = 2.0;
  const AGITATION_DELTA = 0.01;
  const MAX_MOVE_DISTANCE = 10.0;
  const INITIAL_AGITATION = 0.5;

  let agents = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (let i = 0; i < N; i++) {
      agents[i] = {
        x: p.random(p.width),
        y: p.random(p.height),
        agitation: INITIAL_AGITATION,
        microphone: 0,
      };
    }
  };

  p.draw = () => {
    p.background(255);

    const newMicrophones = [];
    for (let i = 0; i < N; i++) {
      const agent = agents[i];

      let newMicrophone = 0;
      for (let j = 0; j < N; j++) {
        if (i === j) continue;

        const other = agents[j];
        const dx = agent.x - other.x;
        const dy = agent.y - other.y;
        const distance = p.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          newMicrophone += other.agitation / p.pow(distance, DISTANCE_EXPONENT);
        }
      }
      newMicrophones[i] = newMicrophone;
    }

    for (let i = 0; i < N; i++) {
      const agent = agents[i];
      const newMicrophone = newMicrophones[i];

      if (newMicrophone > agent.microphone) {
        agent.agitation -= AGITATION_DELTA;
      } else {
        agent.agitation += AGITATION_DELTA;
      }

      agent.agitation = p.constrain(agent.agitation, 0, 1);
      agent.microphone = newMicrophone;

      const moveDistance = agent.agitation * MAX_MOVE_DISTANCE;
      const angle = p.random(p.TWO_PI);
      agent.x += p.cos(angle) * moveDistance;
      agent.y += p.sin(angle) * moveDistance;

      agent.x = p.constrain(agent.x, 0, p.width);
      agent.y = p.constrain(agent.y, 0, p.height);
    }

    p.noStroke();
    p.fill(128, 128);
    for (let i = 0; i < N; i++) {
      p.circle(agents[i].x, agents[i].y, AGENT_RADIUS * 2);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);
