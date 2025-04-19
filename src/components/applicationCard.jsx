import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Boxes, Briefcase, Download, School } from 'lucide-react'

export const ApplicationCard = ({app, isCandidate = false}) => {

  const handleDownload = () =>{
    const link = document.createElement("a")
    link.href = app?.resume
    link.target = "_blank"
    link.click()
  }

  return (
    <Card className="bg-[#181818] text-white">
        <CardHeader className="border-b-[1px] border-[#373333]">
            <CardTitle className="flex justify-between items-center font-semibold text-xl">
                {isCandidate ? `${app?.job?.title} at ${app?.job?.company?.name}` : app?.name}
                <div className='flex items-center gap-2'>
                <Download size={31} onClick={handleDownload} className="rounded-full borde-[1px] bg-[gray] p-2 cursor-pointer"/>
                <label className='text-sm font-normal'>Download Resume</label>
                </div>
            </CardTitle>
        </CardHeader>

        <CardContent className="mt-5">
          <div className='flex justify-between'>
           <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'><Briefcase color='brown' size={18}/> {app?.experience} Years Of Experience </div>
                <div className='flex gap-2 items-center'><School color='brown' size={18}/> {app?.education}</div>
                <div className='flex gap-2 items-center'><Boxes color='brown' size={18}/> {app?.skills}</div>
           </div>
           <div className='flex flex-col gap-2'>
            {!isCandidate ? <span className='capita'>Status: {app?.status}</span> : <></>}
            <span className='text-gray-400'>{new Date(app?.created_at).toLocaleString()}</span>
           </div>
           </div>
        </CardContent>
    </Card>
  )
}
