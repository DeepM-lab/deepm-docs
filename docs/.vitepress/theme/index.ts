import DefaultTheme from 'vitepress/theme';
import type { App } from 'vue';
import TirePressureConverter from './components/TirePressureConverter.vue';
import DotAgeCalculator from './components/DotAgeCalculator.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('TirePressureConverter', TirePressureConverter);
    app.component('DotAgeCalculator', DotAgeCalculator);
  }
};
