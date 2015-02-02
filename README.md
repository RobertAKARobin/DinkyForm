# DinkyForm

Turns a JSON string embedded in your HTML into questions in a form.

Couldn't hurt to obfuscate it.

```
<code>
<div class="questions">
[
	{
		"head"		: "How much wood would a woodchuck chuck?",
		"type"		: "radio",
		"labels"	:	[
							"Lots!",
							"Not much.",
							"None.",
							"Other"
						]
	},
	{
		"head"		: "How would you describe yourself?",
		"type"		: "checkbox",
		"labels"	:	[
							"Big-haul",
							"Great-go",
							"Neck-or-nothing",
							"Rip-roaring",
							"Everytime-a-bullseye",
							"Other"
						]
	},
	{
		"head"		: "How cool is Robin?",
		"type"		: "scale",
		"max"		: "5",
		"labels"	:	{
							"min": "Not cool at all.",
							"max": "Ice cold."
						}
	},
	{
		"head"		: "Could you explain your answer?",
		"type"		: "textarea"
	}
]
</div>
</code>
```
