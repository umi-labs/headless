import React, { useEffect, useRef, useState } from "react";
import "./gol.css"; // Optional for additional styling

const defaultRows = 25;
const defaultCols = 25;
const cellSize = 20;

const generateEmptyGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

const getRandomGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.5 ? 1 : 0)),
  );
};

const GameOfLife: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [grid, setGrid] = useState<number[][]>(
    generateEmptyGrid(defaultRows, defaultCols),
  );
  const [running, setRunning] = useState(false);
  const performanceMetrics = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const isWebGPU = !!navigator.gpu;
  const [device, setDevice] = useState<GPUDevice | null>(null);
  const [pipeline, setPipeline] = useState<GPURenderPipeline | null>(null);
  const [texture, setTexture] = useState<GPUTexture | null>(null);
  const [textureView, setTextureView] = useState<GPUTextureView | null>(null);
  const [bindGroup, setBindGroup] = useState<GPUBindGroup | null>(null);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let row = 0; row < grid.length; row++) {
          for (let col = 0; col < grid[row].length; col++) {
            ctx.fillStyle = grid[row][col] ? "black" : "white";
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
          }
        }
      }
    }
  };

  const initializeWebGPU = async () => {
    const adapter = await navigator.gpu.requestAdapter();
    if (adapter) {
      const gpuDevice = await adapter.requestDevice();
      setDevice(gpuDevice);
      return gpuDevice;
    }
    return null;
  };

  const createPipeline = async () => {
    if (!device) return;

    const vertexShaderCode = await fetch("./shaders/vertex.wgsl").then((res) =>
      res.text(),
    );
    const fragmentShaderCode = await fetch("./shaders/fragment.wgsl").then(
      (res) => res.text(),
    );

    const vertexShaderModule = device.createShaderModule({
      code: vertexShaderCode,
    });
    const fragmentShaderModule = device.createShaderModule({
      code: fragmentShaderCode,
    });

    const pipeline = device.createRenderPipeline({
      vertex: {
        module: vertexShaderModule,
        entryPoint: "main",
        buffers: [],
      },
      fragment: {
        module: fragmentShaderModule,
        entryPoint: "main",
        targets: [
          {
            format: "bgra8unorm",
          },
        ],
      },
      primitive: {
        topology: "triangle-strip",
      },
    });

    setPipeline(pipeline);
  };

  const createTexture = () => {
    if (!device) return;

    const texture = device.createTexture({
      size: [defaultCols, defaultRows, 1],
      format: "rgba8unorm",
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });

    setTexture(texture);
    setTextureView(texture.createView());
  };

  const createBindGroup = () => {
    if (!device || !texture || !textureView) return;

    const bindGroup = device.createBindGroup({
      layout: device.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.FRAGMENT,
            texture: { sampleType: "float" },
          },
          {
            binding: 1,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: { type: "filtering" },
          },
        ],
      }),
      entries: [
        { binding: 0, resource: textureView },
        { binding: 1, resource: device.createSampler() },
      ],
    });

    setBindGroup(bindGroup);
  };

  const runWebGPU = async () => {
    if (!device || !pipeline || !bindGroup) return;

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: device.getCurrentTexture().createView(),
          loadValue: [0, 0, 0, 1], // Clear to black
          storeOp: "store",
        },
      ],
    };

    const renderFrame = async () => {
      const commandEncoder = device.createCommandEncoder();
      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

      passEncoder.setPipeline(pipeline);
      passEncoder.setBindGroup(0, bindGroup);
      passEncoder.draw(4, 1, 0, 0); // Adjust according to your vertex count
      passEncoder.endPass();

      device.queue.submit([commandEncoder.finish()]);

      // Update metrics and redraw grid
      updateMetrics();
      drawGrid();

      // Only request a new frame if the simulation is running
      if (running) {
        requestAnimationFrame(renderFrame);
      }
    };

    requestAnimationFrame(renderFrame);
  };

  const updateMetrics = () => {
    const endTime = performance.now();
    const frameTime = endTime - startTimeRef.current;
    performanceMetrics.current.push(frameTime);
    startTimeRef.current = endTime;
  };

  useEffect(() => {
    if (running) {
      if (isWebGPU) {
        (async () => {
          const gpuDevice = await initializeWebGPU();
          if (gpuDevice) {
            await createPipeline();
            createTexture();
            createBindGroup();
            await runWebGPU();
          }
        })();
      } else {
        const renderFrame = () => {
          runGame();
          updateMetrics();
          if (running) requestAnimationFrame(renderFrame); // Ensure we only loop if running
        };
        requestAnimationFrame(renderFrame);
      }
    }
  }, [running, grid, isWebGPU]);

  const runGame = () => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((arr) => [...arr]);

      for (let row = 0; row < prevGrid.length; row++) {
        for (let col = 0; col < prevGrid[row].length; col++) {
          const neighbors = countNeighbors(prevGrid, row, col);
          if (prevGrid[row][col] === 1 && (neighbors < 2 || neighbors > 3)) {
            newGrid[row][col] = 0;
          } else if (prevGrid[row][col] === 0 && neighbors === 3) {
            newGrid[row][col] = 1;
          }
        }
      }

      return newGrid;
    });
    drawGrid(); // Ensure the grid is redrawn after updating
  };

  const countNeighbors = (grid: number[][], row: number, col: number) => {
    const neighborPositions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    return neighborPositions.reduce((acc, [dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length
      ) {
        acc += grid[newRow][newCol];
      }
      return acc;
    }, 0);
  };

  const toggleRunning = () => {
    setRunning((prev) => !prev);
  };

  const resetGrid = () => {
    setGrid(generateEmptyGrid(defaultRows, defaultCols));
  };

  const randomizeGrid = () => {
    setGrid(getRandomGrid(defaultRows, defaultCols));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={defaultCols * cellSize}
        height={defaultRows * cellSize}
      />
      <button onClick={toggleRunning}>{running ? "Stop" : "Start"}</button>
      <button onClick={resetGrid}>Reset</button>
      <button onClick={randomizeGrid}>Randomize</button>
      <div>
        <h4>Performance Metrics:</h4>
        <pre>{JSON.stringify(performanceMetrics.current, null, 2)}</pre>
      </div>
    </div>
  );
};

export default GameOfLife;
