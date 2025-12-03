import { render, screen } from '@testing-library/react'
import MessageItem from '../../components/MessageItem'
import type { Message } from '../../types/Message'

describe('MessageItem', () => { 
    const mockMessage: Message = {
        id: 1,
        username: "Testsson",
        text: "Test meddelande",
        date: new Date('2024-12-03T10:33:00') 
    }

    describe('US2: View all messages', () => { 
        it('should show message with correct info', () => {
            render(<MessageItem message={mockMessage}/>)

            expect(screen.getByText("Testsson")).toBeInTheDocument()
            expect(screen.getByText("Test meddelande")).toBeInTheDocument()
            expect(screen.getByText(/december/i)).toBeInTheDocument()
        })
     })
 })