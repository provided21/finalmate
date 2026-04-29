import { demoCourse } from '../data/mockCourse.js';

export function getMemoryMethods(unitId: string) {
  const unit = demoCourse.units.find((item) => item.id === unitId) ?? demoCourse.units[0];
  return {
    unitId: unit.id,
    title: unit.title,
    methods: unit.memoryMethods,
    advice: '先用一句口诀建立抓手，再用例题把口诀落到具体场景。'
  };
}
