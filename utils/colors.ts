import { useAppStore } from "../store/hooks";

const Colors = {
    rose: {
        text: "text-highlight-rose",
        hover: "hover:text-highlight-rose",
        hoverBorder: "hover:border-highlight-rose",
        label: "text-highlight-rose",
        border: "border-highlight-rose",
        bg: "bg-highlight-rose",
        accent: "accent-color-highlight-rose",
        caret: "caret-highlight-rose",
        focus: "focus:ring-highlight-rose focus:ring-2",
        pale: "bg-highlight-rose-pale",
        contrast: "text-white"
    },
    pink: {
        text: "text-highlight-pink",
        hover: "hover:text-highlight-pink",
        hoverBorder: "hover:border-highlight-pink",
        label: "text-highlight-pink",
        border: "border-highlight-pink",
        bg: "bg-highlight-pink",
        accent: "accent-color-highlight-pink",
        caret: "caret-highlight-pink",
        focus: "focus:ring-highlight-pink focus:ring-2",
        pale: "bg-highlight-pink-pale",
        contrast: "text-grave"
    },
    yellow: {
        text: "text-highlight-yellow",
        hover: "hover:text-highlight-yellow",
        hoverBorder: "hover:border-highlight-yellow",
        label: "text-highlight-yellow",
        border: "border-highlight-yellow",
        bg: "bg-highlight-yellow",
        accent: "accent-color-highlight-yellow",
        caret: "caret-highlight-yellow",
        focus: "focus:ring-highlight-yellow focus:ring-2",
        pale: "bg-highlight-yellow-pale",
        contrast: "text-grave"
    },
    orange: {
        text: "text-highlight-orange",
        hover: "hover:text-highlight-orange",
        hoverBorder: "hover:border-highlight-orange",
        label: "text-highlight-orange",
        border: "border-highlight-orange",
        bg: "bg-highlight-orange",
        accent: "accent-color-highlight-orange",
        caret: "caret-highlight-orange",
        focus: "focus:ring-highlight-orange focus:ring-2",
        pale: "bg-highlight-orange-pale",
        contrast: "text-grave"
    },
    green: {
        text: "text-highlight-green",
        hover: "hover:text-highlight-green",
        hoverBorder: "hover:border-highlight-green",
        label: "text-highlight-green",
        border: "border-highlight-green",
        bg: "bg-highlight-green",
        accent: "accent-color-highlight-green",
        caret: "caret-highlight-green",
        focus: "focus:ring-highlight-green focus:ring-2",
        pale: "bg-highlight-green-pale",
        contrast: "text-white"
    },
    indigo: {
        text: "text-highlight-indigo",
        hover: "hover:text-highlight-indigo",
        hoverBorder: "hover:border-highlight-indigo",
        label: "text-highlight-indigo",
        border: "border-highlight-indigo",
        bg: "bg-highlight-indigo",
        accent: "accent-color-highlight-indigo",
        caret: "caret-highlight-indigo",
        focus: "focus:ring-highlight-indigo focus:ring-2",
        pale: "bg-highlight-indigo-pale",
        contrast: "text-white"
    },
    violet: {
        text: "text-highlight-violet",
        hover: "hover:text-highlight-violet",
        hoverBorder: "hover:border-highlight-violet",
        label: "text-highlight-violet",
        border: "border-highlight-violet",
        bg: "bg-highlight-violet",
        accent: "accent-color-highlight-violet",
        caret: "caret-highlight-violet",
        focus: "focus:ring-highlight-violet focus:ring-2",
        pale: "bg-highlight-violet-pale",
        contrast: "text-white"
    },
    slate: {
        text: "text-highlight-slate",
        hover: "hover:text-highlight-slate",
        hoverBorder: "hover:border-highlight-slate",
        label: "text-highlight-slate",
        border: "border-highlight-slate",
        bg: "bg-highlight-slate",
        accent: "accent-color-highlight-slate",
        caret: "caret-highlight-slate",
        focus: "focus:ring-highlight-slate focus:ring-2",
        pale: "bg-highlight-slate-pale",
        contrast: "text-white"
    },
    default: {
        text: "text-grave",
        hover: "hover:text-grave",
        hoverBorder: "hover:border-grave",
        label: "text-secondary",
        border: "border-grave",
        bg: "bg-hover",
        accent: "accent-color-grave",
        caret: "caret-grave",
        focus: "focus:ring-grave focus:ring-2",
        pale: "bg-hover",
        contrast: "text-white"
    }
}

type ColorsTypes = {
    text: string;
    hover: string;
    hoverBorder: string;
    label: string;
    border: string;
    bg: string;
    accent: string;
    caret: string;
    focus: string;
    pale: string;
}

type ColorsValues = {
    rose: ColorsTypes;
    pink: ColorsTypes;
    yellow: ColorsTypes;
    orange: ColorsTypes;
    green: ColorsTypes;
    indigo: ColorsTypes;
    violet: ColorsTypes;
    slate: ColorsTypes;
}

const useColor = (userHighlight?: string | undefined) => {
    if (userHighlight) {
        return Colors[userHighlight as keyof ColorsValues]
    } else {
        const highlight = useAppStore().getState().highlight.value
        return Colors[highlight as keyof ColorsValues]
    }
}

export default useColor;