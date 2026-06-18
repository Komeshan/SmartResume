import User from "../models/User.js"

export const checkQuota = (type) => {
    return async (req, res, next) => {
        try {
            const userId = req.userId
            const user = await User.findById(userId)

            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            // Ensure aiUsage exists
            if (!user.aiUsage) {
                user.aiUsage = {
                    summaryCount: 0,
                    summaryLastReset: new Date(),
                    parserCount: 0,
                    parserLastReset: new Date(),
                    imageCount: 0,
                    imageLastReset: new Date()
                }
                await user.save()
            }

            const now = new Date()
            let limit = 0
            let duration = 0
            let currentCount = 0
            let lastReset = null
            let resetField = ''
            let countField = ''
            let typeLabel = ''

            if (type === 'summary') {
                limit = 10
                duration = 24 * 60 * 60 * 1000 // 24 hours
                currentCount = user.aiUsage.summaryCount
                lastReset = new Date(user.aiUsage.summaryLastReset)
                resetField = 'aiUsage.summaryLastReset'
                countField = 'aiUsage.summaryCount'
                typeLabel = 'daily AI text optimization'
            } else if (type === 'parser') {
                limit = 2
                duration = 7 * 24 * 60 * 60 * 1000 // 7 days
                currentCount = user.aiUsage.parserCount
                lastReset = new Date(user.aiUsage.parserLastReset)
                resetField = 'aiUsage.parserLastReset'
                countField = 'aiUsage.parserCount'
                typeLabel = 'weekly resume imports'
            } else if (type === 'image') {
                limit = 2
                duration = 30 * 24 * 60 * 60 * 1000 // 30 days
                currentCount = user.aiUsage.imageCount
                lastReset = new Date(user.aiUsage.imageLastReset)
                resetField = 'aiUsage.imageLastReset'
                countField = 'aiUsage.imageCount'
                typeLabel = 'monthly profile picture uploads'
            }

            // Check if reset duration has passed
            const timeElapsed = now.getTime() - lastReset.getTime()
            if (timeElapsed >= duration) {
                // Reset credit count and set new last reset date
                user.set(countField, 0)
                user.set(resetField, now)
                await user.save()
                currentCount = 0
            }

            // If user has hit their limit, block
            if (currentCount >= limit) {
                const hoursLeft = Math.max(0, Math.ceil((duration - (now.getTime() - lastReset.getTime())) / (1000 * 60 * 60)))
                let resetMessage = `Try again in about ${hoursLeft} hours.`
                if (type === 'parser') {
                    const daysLeft = Math.max(1, Math.ceil(hoursLeft / 24))
                    resetMessage = `Try again in about ${daysLeft} days.`
                } else if (type === 'image') {
                    const daysLeft = Math.max(1, Math.ceil(hoursLeft / 24))
                    resetMessage = `Try again in about ${daysLeft} days.`
                }

                return res.status(429).json({ 
                    message: `Daily/weekly limit reached! You have used all ${limit} ${typeLabel}. ${resetMessage}`,
                    limits: user.aiUsage
                })
            }

            // Attach user usage data to request to be used in controllers
            req.userUsage = user.aiUsage
            next()

        } catch (error) {
            return res.status(500).json({ message: "Quota verification failed: " + error.message })
        }
    }
}

// Helper utility to increment user usage count in database upon successful execution
export const incrementQuota = async (userId, type) => {
    try {
        const user = await User.findById(userId)
        if (!user) return null

        if (type === 'summary') {
            user.aiUsage.summaryCount += 1
        } else if (type === 'parser') {
            user.aiUsage.parserCount += 1
        } else if (type === 'image') {
            user.aiUsage.imageCount += 1
        }

        await user.save()
        return user.aiUsage
    } catch (error) {
        console.error("Increment quota error:", error.message)
        return null
    }
}
