const fs = require('fs');
const path = require('path');

const PAGE_PATH = path.join(process.cwd(), 'app', 'page.tsx');
let content = fs.readFileSync(PAGE_PATH, 'utf-8');

const matchStart = content.indexOf("{/* ═══ Recent classrooms — collapsible ═══ */}");
const matchEnd = content.indexOf("{/* Footer — flows with content, at the very end */}");

if (matchStart !== -1 && matchEnd !== -1) {
    const replacement = `{/* ═══ Main Tabbed Section (Featured / My Courses) ═══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-10 w-full max-w-6xl flex flex-col items-center pb-24"
      >
        <Tabs defaultValue="featured" className="w-full">
          {/* Tabs Navigation */}
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1 h-auto flex gap-1">
              <TabsTrigger 
                value="featured" 
                className="rounded-full px-5 py-2 text-sm font-medium transition-all text-white/70 hover:text-white"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger 
                value="my-courses" 
                className="relative rounded-full px-5 py-2 text-sm font-medium transition-all text-white/70 hover:text-white"
              >
                My Courses
                {classrooms.length > 0 && (
                  <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                    {classrooms.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Featured Content Tab */}
          <TabsContent value="featured" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <FeaturedCourses />
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="my-courses" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            {classrooms.length > 0 ? (
              <div
                className={cn(
                  'w-full pt-4',
                  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4',
                  'justify-items-center'
                )}
              >
                <div
                  className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden border border-dashed border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  onClick={() => setIsRevealed(true)}
                >
                  <Plus className="size-6 text-white/50 mb-2" />
                  <span className="text-[14px] text-white/50 font-medium">Create New</span>
                </div>
                {classrooms.map((classroom) => (
                  <motion.div
                    key={classroom.id}
                    layoutId={\`classroom-\${classroom.id}\`}
                    className="w-full flex justify-center"
                  >
                    <ClassroomCard
                      classroom={classroom}
                      confirmingDelete={pendingDeleteId === classroom.id}
                      onConfirmDelete={() => confirmDelete(classroom.id)}
                      onCancelDelete={() => setPendingDeleteId(null)}
                      onClick={() => router.push(\`/classroom/\${classroom.id}\`)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="mt-10 py-16 w-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-black/10 backdrop-blur-sm">
                <Box className="size-10 text-white/20 mb-4" />
                <p className="text-white/40 text-sm">No recent courses</p>
                <button
                  onClick={() => setIsRevealed(true)}
                  className="mt-6 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  Create one now
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      `;
    
    if (!content.includes("{/* ═══ Main Tabbed Section")) {
      content = content.slice(0, matchStart) + replacement + content.slice(matchEnd);
      fs.writeFileSync(PAGE_PATH, content);
      console.log("Patched successfully");
    } else {
      console.log("Already patched");
    }
} else {
    console.log("Failed to find bounds", { start: matchStart, end: matchEnd });
}
