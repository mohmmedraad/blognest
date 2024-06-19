import { type AutoformatPlugin } from "@udecode/plate-autoformat"
import { type PlatePlugin } from "@udecode/plate-common"

import { autoformatRules } from "@/lib/plate/autoformat-rules"

export const autoformatPlugin: Partial<PlatePlugin<AutoformatPlugin>> = {
    options: {
        rules: autoformatRules as AutoformatPlugin["rules"],
        enableUndoOnDelete: true,
    },
}
