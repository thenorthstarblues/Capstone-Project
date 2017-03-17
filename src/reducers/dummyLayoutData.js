const dummyData00={
	0:{ height:600, width:900, x:0, y:0, parent:[], children:[17, 1], tag: 'div', css: []  },
	17:{ height:340, width:420, x:79, y:220, parent:[], children:[2,3,4,10,15,14,13,9,8,7], tag: 'div', css: []  },
	1:{ height:340, width:210, x:539, y: 220, parent:[], children:[6,5,11,12,16], tag: 'div', css: []  },
	2:{ height:240, width:50, x:369, y:230, parent:[], children:[], tag: 'div', css: [] },
	3:{ height:70, width:170, x:89, y:480, parent:[], children:[], tag: 'div', css: []  },
	4:{ height:70, width:220, x:269, y:480, parent:[], children:[], tag: 'div', css: []  },
	5:{ height:170, width:40, x:699, y:260, parent:[], children:[], tag: 'div', css: []  },
	6:{ height:70, width:190, x:549, y:480, parent:[], children:[], tag: 'div', css: []  },
	10:{ height:30, width:270, x:89, y:440, parent:[], children:[], tag: 'h1', css: []  },
	11:{ height:20, width:190, x:549, y:230, parent:[], children:[], tag: 'h1', css: []  },
	12:{ height:30, width:190, x:549, y:440, parent:[], children:[], tag: 'h1', css: []  },
	7:{ height:200, width:270, x:89, y:230, parent:[], children:[], tag: 'img', css: []  },
	8:{ height:40, width:60, x:429, y:230, parent:[], children:[], tag: 'img', css: []  },
	9:{ height:40, width:60, x:429, y:280, parent:[], children:[], tag: 'img', css: []  },
	13:{ height:40, width:60, x:429, y:330, parent:[], children:[], tag: 'img', css: []  },
	14:{ height:40, width:60, x:429, y:380, parent:[], children:[], tag: 'img', css: []  },
	15:{ height:40, width:60, x:429, y:430, parent:[], children:[], tag: 'img', css: []  },
	16:{ height:170, width:140, x:549, y:260, parent:[], children:[], tag: 'img', css: []  },
};

const dummyData11={
	0:{ height:300, width:680, x:129, y:220, parent:[], children:[], tag: 'div', css: []  },
	1:{ height:60, width:220, x:139, y:450, parent:[], children:[], tag: 'div', css: []  },
	2:{ height:60, width:170, x:409, y:450, parent:[], children:[], tag: 'div', css: []  },
	3:{ height:60, width:180, x:619, y:450, parent:[], children:[], tag: 'div', css: []  },
	8:{ height:20, width:660, x:139, y:420, parent:[], children:[], tag: 'h1', css: []  },
	6:{ height:180, width:160, x:139, y:230, parent:[], children:[], tag: 'img', css: []  },
	4:{ height:120, width:140, x:329, y:230, parent:[], children:[], tag: 'img', css: []  },
	5:{ height:160, width:180, x:499, y:230, parent:[], children:[], tag: 'img', css: []  },
	7:{ height:180, width:90, x:709, y:230, parent:[], children:[], tag: 'img', css: [] },
};

const quickParents = (data => {
	const origKeys = Object.keys(data);

	origKeys.forEach(key=>{
		if (data[key].children){
			data[key].children.forEach(childId=>{
				data[childId].parent = key;
			})
		}

	})

	return data;
});

export const dummyData0 = quickParents(dummyData00);
export const dummyData1 = quickParents(dummyData11);



