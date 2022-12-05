import s from './ConfigScreen.module.scss';
import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, ContextInspector } from 'datocms-react-ui';

type Props = {
  ctx: RenderConfigScreenCtx;
};

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
      <p>DatoCMS Utils</p>
      <div className={s.container}>

      </div>
    </Canvas>
  );
}
