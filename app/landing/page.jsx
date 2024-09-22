'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, Circle, ListTodo, Trello } from 'lucide-react'
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">


      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-orange-500 text-white mt-[-7px]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Organize Your Life with TodoMaster</h2>
          <p className="text-xl mb-8">The ultimate todo list and kanban board application</p>
          <Link href='/login'>
          <Button size="lg" >Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListTodo className="mr-2 text-green-500" />
                  Create Todos
                </CardTitle>
              </CardHeader>
              <CardContent>
                Easily create, manage, and organize your tasks with our intuitive todo list functionality.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trello className="mr-2 text-purple-500" />
                  Kanban Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                Visualize your workflow and boost productivity with our flexible kanban board feature.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See It in Action</h2>
          <Tabs defaultValue="todos" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="todos">Todo List</TabsTrigger>
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            </TabsList>
            <TabsContent value="todos">
              <Card>
                <CardHeader>
                  <CardTitle>Todo List Demo</CardTitle>
                  <CardDescription>Experience our powerful todo list feature</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 text-green-500" />
                      <span className="line-through">Complete project proposal</span>
                    </li>
                    <li className="flex items-center">
                      <Circle className="mr-2 text-gray-400" />
                      <span>Review client feedback</span>
                    </li>
                    <li className="flex items-center">
                      <Circle className="mr-2 text-gray-400" />
                      <span>Prepare presentation slides</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Input placeholder="Add a new todo..." className="mr-2" />
                  <Button>Add</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="kanban">
              <Card>
                <CardHeader>
                  <CardTitle>Kanban Board Demo</CardTitle>
                  <CardDescription>Visualize your workflow with our kanban board</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-100 p-4 rounded">
                      <h3 className="font-bold mb-2">To Do</h3>
                      <div className="bg-white p-2 rounded mb-2">Research competitors</div>
                      <div className="bg-white p-2 rounded">Create wireframes</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded">
                      <h3 className="font-bold mb-2">In Progress</h3>
                      <div className="bg-white p-2 rounded">Develop MVP</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded">
                      <h3 className="font-bold mb-2">Done</h3>
                      <div className="bg-white p-2 rounded">Define project scope</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied users and start organizing your tasks today!</p>
          <Link href='/login'>
          <Button size="lg" variant="secondary" >Sign Up Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TodoMaster</h3>
              <p>Simplify your life, one task at a time.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-gray-300">Github Repo</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/ravikiran-anaparthi-60861a255/" className="hover:text-gray-300">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Tooltip Provider */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="fixed bottom-4 right-4 rounded-full" size="icon">
              <ListTodo className="h-6 w-6" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
          <Link href='/login'>
            <p>Try TodoMaster Now!</p>
            </Link>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}